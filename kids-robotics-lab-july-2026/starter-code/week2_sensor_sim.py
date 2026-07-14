# === SENSOR SIMULATOR ===
# Week 2, Main Challenge (pairs)
# The sensor reports distance to the nearest object in cm.
# Minimum win: run it 5 times and trigger all three behaviors.
# Standard win: add a fourth zone, plus a random battery check.
# Boss level: two sensors (left_distance, right_distance) —
#             announce which way the robot should turn.

import random

distance = random.randint(1, 100)
print(f"SENSOR READING: {distance} cm")

if distance < 10:
    print("EMERGENCY STOP! Obstacle!")
elif distance < 30:
    print("Slowing down... careful...")
else:
    print("All clear. Full speed ahead!")
