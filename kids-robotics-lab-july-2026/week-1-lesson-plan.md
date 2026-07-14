# Week 1 — Robot Memory: Variables & Talking to Your Program

**Kids Robotics Lab · July 2026 · Session 1 of 3 · 6:00–8:00 PM**

## Session Objectives

By 8:00 PM, every student can:

1. Explain that a **variable** is a labeled box where the program remembers something.
2. Create and change variables in Python (`name = "Rusty"`, `battery = 100`).
3. Use `input()` to get information from a person and `print()` with f-strings to talk back.
4. Run, break, and fix a small program on their own (first debugging reps).
5. Say how this connects to robots: *a robot's brain is full of variables — battery level, speed, sensor distance.*

**This week's growth artifact:** every student saves a working "Robot ID Badge" program in their Replit account. This is the baseline we'll compare against in Week 3.

## Prep (beyond the standing brief checklist)

- Load `starter-code/week1_id_badge.py` into a Replit project on the instructor laptop; test that it runs on the projector.
- Whiteboard: draw a block-code "set variable" block next to `robot_name = "Rusty"` — the side-by-side is the heart of the mini-lesson.
- Assistant #1: pre-check that every returning student can log in to Replit; have 2–3 spare accounts ready for anyone locked out.
- Print or display the challenge card (bottom of this doc) so students aren't waiting on the projector.

---

## Minute-by-Minute

### 6:00–6:10 · Meal & Settle-In (10 min)
Eat at the meal table, **then** move to laptop stations (no food near laptops). Assistant #2 runs attendance and meal service. Lead Instructor circulates and asks kids what they remember from Hello World last month — informal pre-assessment.

### 6:10–6:20 · Welcome & Warm-Up (10 min)
- Frame the month: **"In three weeks you're going to teach a robot to think. Tonight we give it a memory."**
- Warm-up on the projector, whole group, out loud: instructor types `print("Hello, Robotics Lab!")` and runs it. Then asks: "What do I change to make it greet YOU?" Take three student answers, type them live, run them. (Recall from last month + instant success in minute one.)

### 6:20–6:40 · Mini-Lesson: Variables Are Robot Memory (20 min)
Live-code on the projector — short, interactive, no slides needed:

1. **The box metaphor.** A variable is a labeled box the program remembers. Show the block-coding "set variable" block on the whiteboard next to:
   ```python
   robot_name = "Rusty"
   battery = 100
   ```
   *"You've done this a hundred times with blocks. Python just spells it with an equals sign."*
2. **Reading the box** — f-strings (teach these from day one; they're the easiest way to print variables):
   ```python
   print(f"My robot is {robot_name} and its battery is {battery}%")
   ```
3. **Changing the box:**
   ```python
   battery = battery - 10
   print(f"After driving: {battery}%")
   ```
   Ask the room to predict the output *before* running — prediction is the habit we're building.
4. **`input()` — the program's ears:**
   ```python
   pilot = input("Who is driving this robot? ")
   print(f"Welcome aboard, {pilot}!")
   ```
5. **Robot connection (30 seconds):** if the demo robot/kit is on the display table, point at it: "Inside that robot right now are variables — battery %, wheel speed, distance to the wall. Everything you learn tonight is how real robots remember."

Checks for understanding while typing: "What will this print?", "What happens if I forget the quotes?" (then actually break it and show the error — normalizes errors as clues, not failures).

### 6:40–7:05 · Guided Challenge: Robot ID Badge (25 min)
**Everyone codes. Quick win target: running output within 10 minutes.**

Students open Replit and copy the starter (or type it — typing is better for retention if time allows). Starter in `starter-code/week1_id_badge.py`:

```python
# === ROBOT ID BADGE ===
robot_name = "Rusty"
robot_color = "red"
battery = 100
top_speed = 5

print("=========================")
print(f"  ROBOT ID: {robot_name}")
print(f"  Color: {robot_color}")
print(f"  Battery: {battery}%")
print(f"  Top speed: {top_speed} mph")
print("=========================")
```

**Level 1 — Minimum win (everyone):** run it, then change the variables so it's *your* robot — new name, color, speed. Raise your hand and show a staff member your badge. ✅ Quick reward: staff makes a big deal of every first badge.

**Level 2 — Standard win (most students):** add two new variables of your own invention (`wheels`, `favorite_snack`, `laser_count` — silly is encouraged) and print them on the badge.

**Level 3 — Boss level (fast finishers):** use `input()` so the program *asks the user* for the robot's name and color, then builds the badge from the answers. Bonus: add a line that subtracts battery and prints the new level.

Staff deployment: Lead floats and pushes Level 2/3; Assistant #1 camps with anyone fighting Replit or syntax; Assistant #2 takes photos of first badges (if permitted) and supports one-on-one.

### 7:05–7:10 · Brain Break: Robot Freeze Challenge (5 min)
Per the standing brief. Tonight's tie-in: after the game, ask "When I said *Charge Battery*, what variable was I changing?" (battery!)

### 7:10–7:40 · Main Challenge: Robot Mad Libs (30 min)
**Pairs (mix experience levels — one navigator, one driver, swap halfway).**

Build a program that interviews the user with `input()` and prints a funny robot story from the answers. Starter in `starter-code/week1_mad_libs.py`:

```python
# === ROBOT MAD LIBS ===
name = input("Robot name? ")
place = input("A place? ")
food = input("A food? ")
number = input("A number? ")

print()
print(f"One day, {name} the robot rolled into {place}.")
print(f"It scanned the area and found {number} pieces of {food}.")
print(f"'{food.upper()}!' beeped {name}. 'MY FAVORITE FUEL!'")
```

- **Minimum win:** get the starter running and play it with your partner.
- **Standard win:** add at least 3 more questions and 3 more story lines.
- **Boss level:** add a `battery` variable that starts at 100 and drops after each story event, printed as the story goes ("Battery now 70%..."). Sneak preview: "Next week your robot will *decide* what to do when battery gets low."

The `.upper()` trick always gets a laugh — show it on the projector at the halfway mark as a "cheat code" reveal.

### 7:40–7:52 · Showcase (12 min)
3–4 volunteer pairs run their Mad Libs on the projector with the Lead as the victim answering the questions. Applaud every demo. Ask each pair: "Which line was hardest to get working?" — celebrates debugging, not just output.

### 7:52–8:00 · Wrap-Up & Pickup (8 min)
- Exit ticket (verbal, going around): *"A variable is like a ______."* Any reasonable metaphor counts.
- **Everyone saves their Replit project** — remind them this is Week 1 evidence we'll look back at in Week 3.
- Tease next week: "Your robot has memory. Next week it gets a brain — it will make its own decisions."
- Standard pickup procedure per the facilitator brief. Staff debrief after last pickup.

---

## Differentiation Notes

- **Struggling students:** stay on Level 1 all night — that's a full win. Assistant pairs them with a patient partner for Mad Libs and lets them be the "navigator" (reads/decides) while the partner types.
- **Advanced students:** boss levels are deliberately open-ended. Extra stretch if needed: `int(input(...))` for doing math on a number the user typed (this will fail interestingly with plain `input()` — a great guided discovery).
- **Common bugs to expect** (staff cheat-sheet):
  - Missing quote or parenthesis → read the error line number together.
  - `Print` vs `print` — Python is case-sensitive.
  - Forgetting the `f` in f-strings → prints `{robot_name}` literally. Fun to show on projector once.

## Success Criteria (tonight's version of the standing checklist)

- [ ] Every student ran a program with at least one variable they changed themselves.
- [ ] Every student's Robot ID Badge is saved in their Replit account.
- [ ] Every student used `input()` at least once (Level 1 of Mad Libs counts).
- [ ] At least 3 pairs showcased.
- [ ] Exit ticket answered by every student.
