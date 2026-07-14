# === ROBOT BRAIN v1 ===
# Week 2, Guided Challenge
# Level 1: Try all four paths, then make it YOUR robot's name.
# Level 2: Add two new commands with your own responses.
# Level 3: Ask for a battery level first with int(input(...)).
#          If battery < 20, the robot refuses every command.

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
