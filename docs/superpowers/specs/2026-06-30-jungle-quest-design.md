# Jungle Quest — Design Spec

**Date:** 2026-06-30
**Platform:** MakeCode Arcade (TypeScript/JavaScript) on an ElecFreaks Retro Arcade device
**Audience:** Elementary students (ages 7–10), new to coding
**Dual goal:** A polished "wow" demo to play AND clean, hackable, well-commented code students can modify afterward.
**Workflow constraint:** Must remain a **single file** the teacher pastes into arcade.makecode.com → Download → drag `.uf2` to the device. No external assets, no multi-step editor setup.

---

## 1. Vision

Replace the current `2_Cavern.js` with **Jungle Quest**: a forgiving, juicy, side-scrolling
platformer treasure hunt. An explorer runs, jumps, stomps, and throws coconuts through three
jungle-ruin levels, collecting gems and grabbing power-ups, ending in a Temple Guardian boss fight.

Two audiences served by one file:
- **Players:** lots of feedback (particles, sound, screen shake), a real difficulty curve, celebration moments.
- **Young hackers:** a top-of-file CONFIG block and ASCII-art level maps they can edit by "drawing with letters."

---

## 2. Game Flow (state machine)

```
TITLE  →  LEVEL 1  →  LEVEL 2  →  LEVEL 3 (+ BOSS)  →  VICTORY
            ↑___________ "Level Complete!" 🎉 ___________|
                      (hearts = 0 → GAME OVER → TITLE)
```

States: `TITLE`, `PLAYING`, `LEVEL_COMPLETE`, `BOSS`, `VICTORY`, `GAME_OVER`.

- **TITLE:** "JUNGLE QUEST" splash with a press-to-start prompt and a small animated sparkle.
- **PLAYING:** load level from ASCII map; player must reach the **exit idol (`F`)** to advance.
- **LEVEL_COMPLETE:** confetti + "Level Complete!" + "All gems!" bonus check, then next level.
- **BOSS:** triggered at the end of Level 3 (Temple Guardian).
- **VICTORY:** final score + best score (saved on device).
- **GAME_OVER:** when hearts reach 0; returns to TITLE.

---

## 3. Player & Controls

- **D-pad:** move left/right. **A:** jump. **B:** throw coconut.
- **Two ways to beat enemies** (both kid-intuitive):
  - **Stomp:** land on an enemy from above to squish it.
  - **Throw:** hit an enemy with a thrown coconut.
- **Forgiveness (critical for ages 7–10):**
  - **5 hearts.**
  - **Invincibility flash** after taking damage (i-frames) — fixes the old game's instant boss death.
  - **Coyote time:** can still jump for a short window after walking off a ledge.
  - Generous hitboxes; knockback on hit instead of harsh punishment.
- **Animation:** 2-frame walk cycle + idle frame so the hero feels alive. Faces the direction last moved; throws in that direction.

---

## 4. Power-ups

Timed pickups with an on-screen status icon + pickup sound. Effect lasts a configurable duration,
then wears off (clear visual/audio cue when it ends).

| Pickup        | ASCII | Effect                          |
|---------------|-------|---------------------------------|
| 🪶 Feather    | (in `P` pool) | Double-jump            |
| 👟 Boots      | (in `P` pool) | Speed boost            |
| 🛡️ Shield     | (in `P` pool) | Temporary invincibility|
| 🔥 Triple-throw | (in `P` pool) | Throw 3 coconuts at once |

`P` in a level map spawns a power-up; which one is determined per-placement (a parallel list/marker
so level authors can choose, defaulting to a rotation). Keep the mechanism simple and documented.

---

## 5. Enemies

Three reusable enemy types plus one boss. Each is one hit to defeat (stomp or coconut).

- 🐌 **Crawler (beetle):** paces back and forth on a platform; turns at walls/ledges.
- 🦇 **Flyer (parrot/bat):** bobs through the air in a sine wave; ignores gravity.
- 🐸 **Hopper (frog):** periodically hops toward the hero.
- 👹 **Temple Guardian (boss):** large idol with several HP (configurable, ~6–8). Telegraphs attacks,
  flashes + screen-shakes when hit, has a clear defeat celebration. Beatable but exciting; contact
  costs a heart but respects player i-frames.

ASCII markers: `e` = crawler, `f` = flyer, `h` = hopper (boss is spawned by the BOSS state, not the map).

---

## 6. Collectibles & Score

- 💎 **Gems (`g`)**: collecting gives points + sparkle particle + chime.
- **"All gems!" bonus**: collecting every gem in a level awards a bonus at level complete.
- **Score** carries across levels. **Best score** saved on the device via the built-in high-score
  storage and shown on the Victory screen.

---

## 7. Game Feel / "Juice"

- Particle effects: gem pickup, enemy stomp/defeat, power-up grab, level complete.
- **Screen shake** on stomps, boss hits, and taking damage.
- **Sound** for every action: jump, throw, collect, hurt, power-up, level-complete, victory.
- Smooth **camera follow** within level bounds.
- A simple **per-level background** for depth/mood.
- Celebration effects between levels and on victory.

---

## 8. Hardware / Performance Guardrails (real device)

- Keep **simultaneous sprites modest** (e.g., ≤ ~6 enemies + projectiles per level) to respect RAM.
- Small tileset (a handful of 16×16 tiles); reasonably sized sprite images.
- Destroy projectiles/particles promptly (auto-destroy off-screen).
- Levels sized to scroll horizontally but not be enormous.

---

## 9. Technical Architecture — ASCII → Tilemap

Levels are authored as arrays of equal-length strings. A **loader** converts each map into a
real MakeCode **tilemap** so collision and gravity use the rock-solid built-in physics, then scans
the same map to spawn gems, enemies, power-ups, the player start, and the exit.

**Tile / entity legend (documented in code):**

| Char | Meaning            |
|------|--------------------|
| `X`  | Solid wall tile    |
| `.`  | Empty air          |
| `@`  | Player start       |
| `F`  | Exit idol (finish) |
| `g`  | Gem                |
| `e`  | Crawler enemy      |
| `f`  | Flyer enemy        |
| `h`  | Hopper enemy       |
| `P`  | Power-up           |

**Loader responsibilities:**
1. Build a tilemap whose wall tiles come from `X` cells; set those tiles as walls.
2. Set the player start from `@`.
3. Spawn gems / enemies / power-ups / exit from their markers.
4. Set camera bounds to the level size.

**Risk + fallback (must verify early):** Constructing a tilemap purely in pasted code depends on the
device build's tilemap-construction API (`tiles.createTilemap` / `tiles.setTilemap` or equivalent).
This will be **verified against the target MakeCode version as the first implementation step**. If that
API is unavailable/fussy on the device, fall back to **wall-sprite collision** (sprites tagged solid +
a small custom collision resolver) while keeping the *exact same ASCII-level authoring workflow* — the
teacher and students see no difference in how levels are written.

---

## 10. Code Organization (for hackability)

Single file, ordered easy-to-edit → engine, with clear banner comments between sections:

1. **⚙️ CONFIG / EDIT-ME** — tunables as named constants: move speed, jump velocity, gravity, starting
   hearts, gem points, power-up duration, boss HP, etc. "Change one number, feel the difference."
2. **🗺️ LEVELS** — `LEVEL_1`, `LEVEL_2`, `LEVEL_3` as ASCII string arrays + per-level background choice.
   Adding a level = copy a block and add it to the level list.
3. **🎨 ART** — all `img\`...\`` sprite/tile literals, grouped and labeled.
4. **🔧 ENGINE** — loader, physics helpers, enemy AI, power-up logic, juice, state machine. Heavily
   commented in kid-friendly language but separated so students don't *have* to touch it.

Comment style: friendly, plain-English, explains the "why" at a 7–10 reading level where it matters
for hackers (especially in CONFIG and LEVELS).

---

## 11. Success Criteria

- Pastes as one file into arcade.makecode.com, compiles, and runs on the ElecFreaks Retro Arcade.
- All three levels are completable; boss is beatable; no soft-locks.
- Forgiveness features work (i-frames, coyote time, 5 hearts) — no instant deaths.
- All four power-ups, all three enemy types, gems, and score/best-score function.
- Juice is present (particles, shake, sound) and the game feels lively.
- A child can change a CONFIG number or edit an ASCII level and see the effect without touching engine code.

---

## 12. Out of Scope (this round)

- Multiplayer / co-op.
- Visual tilemap-editor assets (deliberately avoided to preserve single-file paste).
- Procedural/random level generation.
- Saving progress between levels across power cycles (only best score persists).
