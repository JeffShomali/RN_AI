# React Native Bluetooth Low Energy(BLE) Scanner
> Unfortunately React Native and [Expo](https://expo.canny.io/feature-requests/p/bluetooth-api) do not have Bluetooth API. 
Other people have the same issue [Stack-overflow](https://stackoverflow.com/questions/50603841/bluetooth-application-with-react-native) or [This](#https://stackoverflow.com/questions/41349860/can-react-native-used-to-build-my-bluetooth-apps) or [this](https://thoughtbot.com/blog/cutting-our-blueteeth-on-react-native).
[Make Raspberry Pi Device Become a Bluetooth Object Push Profile (OPP) Server](https://www.instructables.com/id/Make-Raspberry-Pi-device-become-a-Bluetooth-Object/)

[BlueZ Wiki](https://wiki.archlinux.org/index.php/bluetooth#hcitool_scan:_Device_not_found)



- [Environment Setup](#environment-setup)
  - [Setup Raspberry PI3](#setup-raspberry-pi3)
    - [Setup network](#setup-network)
    - [Setup SSH](#setup-ssh)
    - [Setup Node and NPM](#setup-node-and-npm)
- [Server Setup](#server-setup)
  - [Basic Bluetooth CLI](#basic-bluetooth-cli)
  - [Server Characteristics](#server-characteristics)

- [Using Linux Bluetooth](#using-linux-bluetooth)

## Environment Setup

### Setup Raspberry PI3

- To setup Raspberry Pi follow [this](https://www.w3schools.com/nodejs/nodejs_raspberrypi.asp) instruction.

### Setup network

- To Setup Network run the following commands

```bash
$ sudo iwlist wlan0 scan #to scan wireless networks.

# add the network connection to
$ sudo nano /etc/wpa_supplicant/wpa_supplicant.conf

  network={
    ssid="SSID"
    psk="Pass"
  }

$ sudo reboot # reboot the system

$ ifconfig wlan0 | grep inet # check to see if wifi is working # inet addr:192.168.1.21
```

### Setup SSH

```bash
 $ sudo raspi-config # to run Raspberry Pi Software Configuration Tool

 Select option 5 "Interfacing Options"
 Select P2 SSH
 Confirm "YES"

 Select 2 "Hostname", and follow the instructions to modify the hostname.

 selecting "Finish", then Select "Yes"
```

### Setup Node and NPM

```Bash
$ sudo apt-get update         # Update system package list
$ sudo apt-get dist-upgrade   # Upgrade all installed packages
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -  # download and install Node.js
$ sudo apt-get install -y nodejs # install Node
$ node -v # confirm installation
```

---

## Server Setup

```bash
$ ssh host@ip             # SHH to raspberry
$ hciconfig               # verify available Bluetooth
  
# List of blutooth tools need to install to work on BLE on Linux
sudo apt-get install blueman     # It is a full featured Bluetooth manager whcih is shown on GUI,.
sudo apt-get install bluetooth   #This package provides all the plugins supported by BluezBluetooth stack.
sudo apt-get install bluez       # This package provides the Bluetooth protocol stack and the bluetoothctl utility.
sudo apt-get install bluez-firmware 
sudo apt-get install bluez-obexd 
sudo apt-get install bluez-utils
sudo apt-get install pi-bluetooth 
sudo apt-get install pulseaudio-module-bluetooth 

$ sudo apt install bluetooth bluez blueman libbluetooth-dev libudev-dev # install blutooth libraries

$ hciconfig  # get Raspberry Pi Bluetooth device information. 
$ sudo hciconfig hci0 up     # activate Blutooth functionality
$ sdptool add sp







$ mkdir server && cd server && npm init -y          # generate package.json in server
directory
$ npm install bleno --save     # install Bleno
$ touch server.js # create an empty js file
```

#### Basic Bluetooth CLI
- Run  `$ sudo systemctl stop/status/start bluetooth` # to start, stop or check status of Bluetooth daemon.
- After you installed the bluetooth packages and run the Bluetooth daemon you can run `bluetoothctl` to start the Bluetooth CLI.
- Use `[bluetooth]# help/quit/exit` to get help or exit the cli.
- 

#### Server Characteristics

- Add the following in `server.js`

```javascript
const bleno = require('bleno');

const UUID = '69d9fdd724fa4987aa3f43b5f4cabcbf'; // set your own value
const MINOR = 2; // set your own value
const MAJOR = 1; // set your own value
const TX_POWER = -60; // just declare transmit power in dBm

console.log('Starting bleno...');

bleno.on('stateChange', state => {
  if (state === 'poweredOn') {
    console.log('Starting broadcast...');

    bleno.startAdvertisingIBeacon(UUID, MAJOR, MINOR, TX_POWER, err => {
      if (err) {
        console.error(err);
      } else {
        console.log(
          `Broadcasting as iBeacon uuid:${UUID}, major: ${MAJOR}, minor: ${MINOR}`
        );
      }
    });
  } else {
    console.log('Stopping broadcast...');
    bleno.stopAdvertising();
  }
});
```

- run `sudo node app.js` to start the server.

#### Using Linux Bluetooth

To use the Linux Bluetooth CLI read [this](https://docs.ubuntu.com/core/en/stacks/bluetooth/bluez/docs/reference/available-commands) documentation



---
Packtpub:
What we can build with Raspberry Pi3: Media Center(video streaming), Cloud Storage(Dropbox, ...), GPS Tracker, Web server, Gateway for Bluetooth Devices.

- Technologies in the Internet of Things:
  - Bluetooth (Apple Watch)
  - Wireless Local Area Network (WLAN) such as ChromeCast or Apple TV.
    - This technology is proven to be very effective and simple and can easily be implemented on a device with limited capabilities.
  - Zigbee: is the only lite weighted low power consumption technology available in the market which supports mesh communication and is good for smart plug. Disadvantage is to need to have other controller to manage Zigbee device. 

  - Bluetooth Low Energy: 
     Bluetooth technology was invented to connect mobile devices to computers over a short distance. It was to only use for the limited range and with a limited amount of data. 

     I modified the `/usr/lib/arm-linux-gnueabihf/libarmmem.so`
     `$ btmon` monitor Bluetooth log

```
  sudo apt-get install blueman     # It is a full featured Bluetooth manager whcih is shown on GUI,.
  sudo apt-get install bluetooth   #This package provides all the plugins supported by BluezBluetooth stack.
  sudo apt-get install pi-bluetooth 
  sudo apt-get install pulseaudio-module-bluetooth 
  sudo apt-get install bluez       # This package provides the Bluetooth protocol stack and the bluetoothctl utility.
  sudo apt-get install bluez-firmware 
  sudo apt-get install bluez-obexd 
  sudo apt-get install bluez-utils
```


 

### Run the SNAP
```
- hciconfig -a
- sudo bluetoothd -d -n

sudo !!
sudo /snap/bin/bluez.obexctl
```

### If not connected install this
```sudo apt install pulseaudio-module-bluetooth 
pulseaudio -k
pulseaudio --start
```

### File share from PI to phone
https://www.raspberrypi.org/forums/viewtopic.php?t=97294
OR
https://www.instructables.com/id/Make-Raspberry-Pi-device-become-a-Bluetooth-Object-1/

TroubleShooting:

```
Error
  SDP session setup failed, disabling bluetooth
  net_init() failed

Solution:
$ sudo service bluetooth stop
$ sudo bluetoothd --compat
```

## [Phone to PI Bluetooth Communication](https://www.electronicwings.com/raspberry-pi/using-raspberry-pi-3-on-board-bluetooth-for-communication)

```
$ bluetoothctl
$ power on
$ devices
$ scan on
$ agent on
$ pair <mac address>
$ trust <mac address>
$ Connect <mac address>

---
$ hciconfig
$ hciconfig hci0 up  # if error  “operation not possible due to RF-Kill” run the $ rfkill unblock all
$ sdptool add sp


# --- Listen for message 
$ sudo rfcomm listen hci0&   # wait for device(smartphone) request to connect.
# open Blueterm iOS/Android app on mobile and send message 
$ cat /dev/rfcomm0           # to display message

