# === FIRST DRIVE ===
# Week 3, Guided Challenge
# Level 1: Change the numbers. Draw any closed shape that isn't a square.
# Level 2: Add pencolor("red") and pensize(5). Draw a 6+ sided shape.
# Level 3: Wrap your shape loop inside another loop with a small
#          turn between repeats — spirograph flowers!

from turtle import *

shape("turtle")
speed(3)

# Mission 1: drive a square
for i in range(4):
    forward(100)
    left(90)
