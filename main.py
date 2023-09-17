def on_button_pressed_a():
    global ip
    ip += 1
    basic.show_number(ip)
    serial.write_line("IP:" + ("" + str(ip)))
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_string(receivedString):
    data = receivedString.split(".")
    if data[0] == "m":
        serial.write_line("" + (data[1]))
    elif data[0] == "pm":
        if data[1] == str(ip):
            serial.write_line(data[2])
            

radio.on_received_string(ip):write_line("IP:" + ("" + str(ip)))
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_data_received():
    radio.send_string(serial.read_line())
serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_data_received)

ip = 0
serial.redirect_to_usb()
serial.write_line("Welcome to the RadLAN network")
radio.set_group(1)
ip = 0
basic.show_number(ip)