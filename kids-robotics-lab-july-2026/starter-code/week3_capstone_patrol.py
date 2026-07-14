# === ROBOT PATROL: the July capstone ===
# Week 3, Main Challenge (pairs)
# Memory + Decisions + Movement, all in one robot.
# Minimum win: rename the robot, change the patrol length, and point
#              out which lines are Week 1, Week 2, and Week 3 skills.
# Standard win: when battery < 30, print a warning and shorten steps.
# Boss level: after the loop, grade the mission with if/elif/else on
#             battery. Extra: change pencolor when battery is low.

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
