# Week 3 — Robot Movement: Loops, Turtle Driving & the July Capstone

**Kids Robotics Lab · July 2026 · Session 3 of 3 · 6:00–8:00 PM**

## Session Objectives

By 8:00 PM, every student can:

1. Explain that a **loop** makes the computer repeat work so we don't have to.
2. Write a `for` loop with `range()` to repeat actions a set number of times.
3. Drive an on-screen turtle "robot" using `forward()`, `left()`, `right()` — the same command vocabulary as a physical robot.
4. Combine all three July superpowers in one program: **memory** (variables) + **decisions** (`if`) + **movement** (loops).
5. Look at their Week 1 code and explain every line — the growth moment.

**Growth artifact:** a capstone drawing/driving program, plus the side-by-side moment with their Week 1 badge. This is the session to get parent-facing photos (if permitted).

## Prep (beyond the standing brief checklist)

- Turtle graphics needs a Replit project type that shows a graphics window — **create and test a working turtle Repl on the instructor laptop AND one student laptop before class.** If the default Python Repl doesn't display graphics, use Replit's Python (with Turtle) template and have Assistant #1 ready to share the template link to all students. This is the night's biggest technical risk; do not skip the test.
- Load `starter-code/week3_first_drive.py` and `week3_capstone_patrol.py`; test both on the projector.
- Whiteboard: block-coding "repeat 4 times" block next to `for i in range(4):`.
- Masking-tape a large square on the classroom floor for the warm-up.
- If the demonstration robot platform is available, tonight is its night — same commands, real motors (display/demo only per safety rules).

---

## Minute-by-Minute

### 6:00–6:10 · Meal & Settle-In (10 min)
Standard procedure. Absentee catch-up table: Week 2's Robot Brain starter is enough context to join tonight.

### 6:10–6:20 · Welcome & Warm-Up: Program a Human Robot Around the Square (10 min)
- A volunteer "robot" stands on the taped floor square. The class must call out commands to walk them around it: *forward, turn left, forward, turn left...*
- After they've called ~8 commands, the Lead interrupts: **"Exhausting, right? What did you say four times in a row?"** → "forward, turn left."
- Whiteboard: `repeat 4 times: forward, turn left` next to
  ```python
  for i in range(4):
      forward(100)
      left(90)
  ```
- "Tonight the computer does the repeating — and you'll drive a robot with these exact commands."

### 6:20–6:40 · Mini-Lesson: Loops + Meet Your Turtle Robot (20 min)
Live on the projector:

1. **Loop basics without graphics (2 min):**
   ```python
   for i in range(5):
       print("BEEP!")
   ```
   Change 5 → 100. Instant laugh, instant point made: loops are power.
2. **The turtle is a robot simulator:**
   ```python
   from turtle import *

   shape("turtle")
   forward(100)
   left(90)
   forward(100)
   ```
   "Same commands as Robot Freeze. Same commands real robots take. The turtle is our practice robot until the hardware ones come out."
3. **The square, by hand then by loop.** Type all 8 lines for a square, groan theatrically, then replace with the `for` loop from the whiteboard. Before-and-after is the whole lesson.
4. **The magic reveal — change one number:** `left(90)` → `left(120)` makes a triangle; `range(4)` → `range(36)` with `left(170)` makes a star-burst. Don't explain the math — let them gasp and want to experiment. That hunger powers the next 25 minutes.
5. **The loop variable does work:** show `i` used once, e.g. `forward(i * 2)` in a spiral, flagged as boss-level material.
6. **Robot connection:** if the demo robot is present, run/describe its patrol loop: real robots patrol, scan, and repeat — a loop wrapped around decisions.

### 6:40–7:05 · Guided Challenge: First Drive (25 min)
**Quick win target: turtle moving within 5 minutes — the fastest visible reward of the month.** Starter in `starter-code/week3_first_drive.py`:

```python
# === FIRST DRIVE ===
from turtle import *

shape("turtle")
speed(3)

# Mission 1: drive a square
for i in range(4):
    forward(100)
    left(90)
```

- **Level 1 — Minimum win:** run it, then change the numbers and watch what happens. Draw any *closed shape* that isn't a square (triangle, hexagon — trial and error is the point).
- **Level 2 — Standard win:** add `pencolor("red")` and `pensize(5)` (write these on the whiteboard), and draw a shape with at least 6 sides. Bonus: `bgcolor("black")` + bright pen = instant wow.
- **Level 3 — Boss level:** nested creativity — put your shape loop inside another loop with a small turn between repeats:
  ```python
  for i in range(12):
      for j in range(4):
          forward(80)
          left(90)
      left(30)
  ```
  Spirograph flowers. This is the screenshot-for-parents moment.

Staff deployment: Assistant #1 owns the "graphics window won't show" triage (see prep); Lead pushes levels and drops color commands to tables as rewards; Assistant #2 photographs screens (if permitted).

### 7:05–7:10 · Brain Break: Robot Freeze Challenge — Loop Edition (5 min)
Final round of the month. Twist: instructor calls loops — *"REPEAT 3 TIMES: forward, turn left!"* — and students must execute the whole loop from one instruction. They are now compiling. Tell them that.

### 7:10–7:40 · Main Challenge: Capstone — Robot Patrol (30 min)
**Pairs. This is the July capstone: all three superpowers in one program.** Starter in `starter-code/week3_capstone_patrol.py`:

```python
# === ROBOT PATROL: the July capstone ===
# Memory + Decisions + Movement, all in one robot.
from turtle import *
import random

robot_name = "Rusty"        # Week 1: memory
battery = 100

shape("turtle")
speed(6)

for i in range(8):          # Week 3: movement
    distance = random.randint(1, 100)   # Week 2: the sensor

    if distance < 30:       # Week 2: decisions
        print(f"{robot_name}: obstacle at {distance} cm! Turning!")
        left(120)
    else:
        print(f"{robot_name}: clear ({distance} cm). Rolling on.")
        forward(60)

    battery = battery - 10
    print(f"   battery: {battery}%")

print(f"{robot_name} finished patrol with {battery}% battery.")
```

Every run draws a *different* patrol path — the random sensor steers the robot. Kids immediately re-run it to see new paths.

- **Minimum win:** run it, rename the robot to yours, change patrol length, and explain to a staff member which lines are Week 1, Week 2, and Week 3 skills (they're labeled — reading counts).
- **Standard win:** add a low-battery rule: when battery drops below 30, the robot prints a warning and its patrol steps get shorter (`forward(20)` instead of `forward(60)`).
- **Boss level:** end-of-patrol grade — after the loop, use `if/elif/else` on `battery` to stamp the mission "FLAWLESS PATROL", "MISSION COMPLETE", or "BARELY MADE IT". Extra: change `pencolor` when battery is low so the drawn path *shows* where the robot got tired.

**Portfolio capture (required, ~2 min per student — do it the moment a patrol runs, not as a separate block):** as each student gets a working patrol on screen, staff walks them through three quick saves so they leave with a real portfolio:
1. **Screenshot the drawing.** Capture the turtle window (Assistant #1 posts the OS screenshot keys on the board) and save it into the Repl, named `my-patrol.png`.
2. **One-sentence caption.** In a comment at the top of the capstone file, type `# What my robot does: ______` in their own words.
3. **Confirm all three projects are saved** in their Replit account (Badge, Brain/Sensor, Patrol) — that's the portfolio.

This turns "saved code" into a curated, shareable artifact without adding a timed block — it happens inside the existing challenge window.

### 7:40–7:52 · Showcase + The Growth Moment (12 min)
- 3–4 pairs run their patrol on the projector; the audience predicts turns as the sensor readings print.
- **Then the July payoff (5 min, do not skip):** everyone opens their Week 1 Robot ID Badge next to tonight's capstone. Lead: *"Three weeks ago, this was the hardest thing you'd ever coded. Read it now."* Ask a few students to explain their Week 1 code line by line — they can, and they'll feel it. Photograph this (if permitted); it's the parent-newsletter shot.

### 7:52–8:00 · Wrap-Up & Pickup (8 min)
- Exit ticket: *"Name the three robot superpowers and the Python thing that makes each one."* (memory/variables, decisions/if, movement/loops.)
- Save all projects. These carry into next month.
- **Hand out the take-home certificate** (`portfolio-certificate.html`, printed one per student) — the fill-in blanks let them write their robot's name and their three Replit project links. This is the physical portfolio piece parents see on the fridge.
- Tease the future: "You now speak enough Python to boss around a real robot. Next month, the turtle gets wheels."
- Standard pickup per the facilitator brief. **Extended staff debrief tonight:** wins/challenges for the month, which students are ready for hardware, who needs reinforcement before the smart-robot projects.

---

## The Portfolio: what every student takes home

By the end of tonight, each student owns a small but real body of work — timestamped and re-runnable in their own Replit account:

| Artifact | Week | Why it belongs in a portfolio |
|----------|------|------------------------------|
| **Robot ID Badge** (`.py`) | 1 | Baseline — shows where they started. Great "before" next to the capstone. |
| **Robot Brain + Sensor Simulator** (`.py`) | 2 | Reacts to input and random sensor data — demonstrates logic. |
| **Robot Patrol capstone** (`.py`) | 3 | The showpiece: memory + decisions + movement in one program that draws a new path every run. |
| **`my-patrol.png` screenshot** | 3 | The visual — shareable in a newsletter, portfolio page, or fridge. |
| **Printed certificate** | 3 | Physical take-home with their robot's name and project links filled in. |

**Portfolio talking point for students & parents:** "I taught a robot to think in three weeks — it remembers, it decides, and it moves — and here's the code and the drawing to prove it." Every claim on the certificate maps to a saved file, so the portfolio is evidence, not a participation sticker.

---

## Differentiation Notes

- **Struggling students:** First Drive Level 1 (change numbers, discover shapes) is a complete, joyful win — turtle gives feedback without reading errors. For the capstone, they run and *explain* the labeled starter rather than extending it; explaining is the real assessment.
- **Advanced students:** the boss levels stack; beyond that, offer `while battery > 0:` as a self-taught stretch ("loop until the battery dies — you have everything you need to figure this out"), or `right()` vs `left()` randomized turns.
- **Common bugs cheat-sheet:**
  - Graphics window doesn't appear → wrong Repl template; Assistant #1 has the turtle template link ready.
  - Turtle "does nothing" → code after a typo'd command silently stopped; read the console error together.
  - `forward` misspelled or called before `from turtle import *` → NameError, line number tells you where.
  - Loop body not indented → same Week 2 rule: "the indent IS the snap."

## Success Criteria

- [ ] Every student made the turtle move with a loop they modified.
- [ ] Every student ran the capstone and identified which lines are Weeks 1, 2, and 3.
- [ ] Every pair's capstone showed a different patrol path on re-run (proves the sensor logic works).
- [ ] The Week 1 vs Week 3 growth moment happened on the projector.
- [ ] Exit ticket: three superpowers named by every student; all projects saved for next month.
