input.onButtonPressed(Button.A, function () {
    ip += 1
    basic.showNumber(ip)
    serial.writeLine("IP:" + ("" + ip))
})
radio.onReceivedString(function (receivedString) {
    for (let index = 0; index < 4; index++) {
        radio.sendString(receivedString)
    }
    basic.showLeds(`
        # . . . #
        # # . # #
        # # # # #
        . # # # .
        . . # . .
        `)
    if (data != receivedString) {
        if (receivedString.split(".")[0] == "m") {
            serial.writeLine("" + (receivedString.split(".")[1]))
        } else if (receivedString.split(".")[0] == "pm") {
            if (receivedString.split(".")[1] == convertToText(ip)) {
                serial.writeLine("" + (receivedString.split(".")[2]))
            }
        }
    }
    data = receivedString
})
input.onButtonPressed(Button.B, function () {
    if (ip == 0) {
        ip = 0
    } else {
        ip += -1
    }
    basic.showNumber(ip)
    serial.writeLine("IP:" + ip)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    basic.showLeds(`
        . . # . .
        . # # # .
        # # # # #
        # # . # #
        # . . . #
        `)
    data = serial.readLine()
    serial.writeString(serial.readLine())
    for (let index = 0; index < 5; index++) {
        radio.sendString(serial.readLine())
    }
})
let data = ""
let ip = 0
serial.setBaudRate(BaudRate.BaudRate115200)
serial.redirectToUSB()
serial.writeLine("Welcome To RadLAN")
serial.writeLine("The Radio Local Area Network Using the BBC Microbit Radio")
radio.setGroup(1)
radio.setFrequencyBand(0)
radio.setTransmitPower(7)
ip = 0
basic.showNumber(ip)
