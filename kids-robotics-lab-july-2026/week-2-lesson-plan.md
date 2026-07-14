# Week 2 — Robot Decisions: `if / elif / else` and Booleans

**Kids Robotics Lab · July 2026 · Session 2 of 3 · 6:00–8:00 PM**

## Session Objectives

By 8:00 PM, every student can:

1. Explain that an `if` statement lets a program **choose** between actions.
2. Write `if / elif / else` chains with comparisons (`==`, `<`, `>`, `>=`).
3. Combine last week's skills: take `input()`, store it in a variable, and *decide* based on it.
4. Say the robot connection: *a robot reads a sensor into a variable, then an `if` statement decides what the motors do.*
5. Debug an indentation error (Python's #1 beginner error) without panicking.

**Growth link:** tonight's projects literally reuse Week 1 code — students open their saved work and give it a brain. Returning students see their own file history growing.

## Prep (beyond the standing brief checklist)

- Load `starter-code/week2_robot_brain.py` and `week2_sensor_sim.py` into the instructor Replit; test on projector.
- Whiteboard: block-coding "if/else" hexagon block drawn next to the Python version.
- Prepare the "human robot" props: 3 paper signs — **WALL AHEAD**, **CLEAR**, **CLIFF!** — for the mini-lesson skit.
- Assistant #2: any student absent Week 1 gets 5 minutes of variable catch-up during meal time (Assistant #1 has the Week 1 badge starter ready to paste).

---

## Minute-by-Minute

### 6:00–6:10 · Meal & Settle-In (10 min)
Standard procedure. Catch-up table for Week 1 absentees (see prep note).

### 6:10–6:20 · Welcome & Warm-Up (10 min)
**Human Robot skit** — the hook for tonight:
- Lead Instructor is a robot; an assistant holds up the paper signs as the "sensor."
- Students shout what the robot should do for each sign: WALL AHEAD → turn. CLEAR → forward. CLIFF! → stop and back up.
- Punchline on the whiteboard: *"You just wrote a program."*
  ```
  if sensor == "wall":   turn
  elif sensor == "cliff": stop, back up
  else:                   go forward
  ```
- "Last week your programs had memory. Tonight they make choices."

### 6:20–6:40 · Mini-Lesson: Teaching Programs to Choose (20 min)
Live-code on the projector, building on Week 1 vocabulary:

1. **The simplest decision:**
   ```python
   battery = 15
   if battery < 20:
       print("WARNING: Low battery! Returning to charger.")
   ```
   Point at the whiteboard block-code comparison: "Same hexagon block you know, new spelling."
2. **The indent is the block.** Show it wrong (no indent) and let Python complain. *"In block coding, things snap inside the if-block. In Python, the indent IS the snap."* This one sentence prevents half of tonight's bugs.
3. **`else` and `elif`:**
   ```python
   battery = int(input("Battery level? "))
   if battery > 70:
       print("Full power! Let's roll.")
   elif battery > 20:
       print("Cruising mode.")
   else:
       print("Emergency! Find a charger!")
   ```
   Run it three times with three student-suggested numbers. Have the room predict each output before hitting run.
4. **`int(input(...))`** gets 60 seconds: "input gives you letters; `int()` turns them into a number you can compare." (Advanced kids from last week already met this.)
5. **`==` vs `=`:** one asks a question, one puts something in the box. Write it big on the whiteboard; it stays up all night.
6. **Robot connection:** "Distance sensor reads 8 cm → variable. `if distance < 10: stop()`. That's collision avoidance — you'll write the real thing on hardware soon."

### 6:40–7:05 · Guided Challenge: Robot Brain (25 min)
**Quick win target: a reacting robot within 10 minutes.** Starter in `starter-code/week2_robot_brain.py`:

```python
# === ROBOT BRAIN v1 ===
robot_name = "Rusty"

command = input("Give your robot a command (go/stop/dance): ")

if command == "go":
    print(f"{robot_name} zooms forward! VROOOM!")
elif command == "stop":
    print(f"{robot_name} slams the brakes. SCREECH!")
elif command == "dance":
    print(f"{robot_name} does the robot. Obviously.")
else:
    print(f"{robot_name} tilts its head. 'Command not recognized?'")
```

- **Level 1 — Minimum win:** run it, try all four paths (including a nonsense command), then change `robot_name` to *your* Week 1 robot.
- **Level 2 — Standard win:** add two new commands with your own responses (sing, jump, self-destruct... keep it school-appropriate, they will test this).
- **Level 3 — Boss level:** add a `battery = int(input("Battery level? "))` check *before* the command: if battery is under 20, the robot refuses every command ("Too tired. Feed me electrons."). This nests last week's concept inside this week's.

Same staff deployment as Week 1: Lead pushes levels, Assistant #1 camps on syntax/indent errors, Assistant #2 floats + photos.

### 7:05–7:10 · Brain Break: Robot Freeze Challenge (5 min)
Tonight's twist: add a conditional rule — "If I say a command AND my hand is up, obey. If my hand is down, freeze." The kids are now executing an `if` statement with their bodies. Point that out.

### 7:10–7:40 · Main Challenge: Sensor Simulator (30 min)
**Pairs, swap driver/navigator halfway.** The premise: your robot is driving and its distance sensor sends a number — write the brain that keeps it safe. Starter in `starter-code/week2_sensor_sim.py`:

```python
# === SENSOR SIMULATOR ===
# The sensor reports distance to the nearest object in cm.
import random

distance = random.randint(1, 100)
print(f"SENSOR READING: {distance} cm")

if distance < 10:
    print("EMERGENCY STOP! Obstacle!")
elif distance < 30:
    print("Slowing down... careful...")
else:
    print("All clear. Full speed ahead!")
```

- **Minimum win:** run it 5 times (new random reading each run), confirm all three behaviors trigger, and explain to a staff member *why* the middle case needs `elif`.
- **Standard win:** add a fourth zone of your own design (e.g., under 5 cm = "BACK UP BEEP BEEP"), and a battery variable that also gets a random value with its own warning check.
- **Boss level:** two sensors! Add `left_distance` and `right_distance`, and make the robot announce which way it should turn (turn toward the bigger open distance). This is real obstacle-avoidance logic.

`random` is the night's magic reward — each run is different, so kids re-run their program dozens of times voluntarily. That's the repetition doing the teaching.

### 7:40–7:52 · Showcase (12 min)
Volunteer pairs demo on the projector. Audience job: before each run, *predict* what the robot will say for the reading shown. Ask each pair the same debugging question as last week: "What broke, and how did you fix it?"

### 7:52–8:00 · Wrap-Up & Pickup (8 min)
- Exit ticket: *"Tell me one decision your robot made tonight and how it knew."*
- Save all Replit projects.
- Tease Week 3: "Memory ✅. Decisions ✅. Next week: MOVEMENT. You'll drive a robot across the screen with the same commands from our freeze game — and it draws while it drives."
- Standard pickup per the facilitator brief. Staff debrief.

---

## Differentiation Notes

- **Struggling students:** the Robot Brain Level 1 is the full win — running all four paths and changing the name is genuinely using conditionals. Keep them as navigator in pairs.
- **Advanced students:** boss levels chain concepts; if someone clears the two-sensor challenge, offer: "make the robot keep asking for commands forever" — and when they ask how, say "that's next week" (loops). Perfect cliffhanger.
- **Common bugs cheat-sheet:**
  - `IndentationError` → point to the whiteboard: "the indent IS the snap."
  - `=` vs `==` inside `if` → SyntaxError; the wall sign is up all night.
  - Comparing input text to a number without `int()` → the `if battery > 20` line explodes; walk through the error together.
  - Typed `Go` instead of `go` → doesn't match. Boss-level fix: `command.lower()` — hand it out like a secret cheat code.

## Success Criteria

- [ ] Every student ran a program with an `if/elif/else` they modified.
- [ ] Every student triggered all branches of their Robot Brain at least once.
- [ ] Every student hit (and fixed) at least one error tonight — say this out loud as a *goal*, not an accident.
- [ ] At least 3 pairs showcased with audience predictions.
- [ ] Exit ticket answered by every student; projects saved.
