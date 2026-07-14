# === ROBOT MAD LIBS ===
# Week 1, Main Challenge (pairs)
# Minimum win: run it and play it with your partner.
# Standard win: add 3 more questions and 3 more story lines.
# Boss level: add a battery variable that starts at 100 and drops
#             after each story event ("Battery now 70%...").

name = input("Robot name? ")
place = input("A place? ")
food = input("A food? ")
number = input("A number? ")

print()
print(f"One day, {name} the robot rolled into {place}.")
print(f"It scanned the area and found {number} pieces of {food}.")
print(f"'{food.upper()}!' beeped {name}. 'MY FAVORITE FUEL!'")
