# React Native Bluetooth Low Energy(BLE) Scanner

- [Environment Setup](#environment-setup)
  - [Setup Raspberry PI3](#setup-raspberry-pi3)
    - [Setup network](#setup-network)
    - [Setup SSH](#setup-ssh)
    - [Setup Node and NPM](#setup-node-and-npm)
- [Server Setup](#server-setup)
  - [Basic Bluetooth CLI](#basic-bluetooth-cli)
  - [Server Characteristics](#server-characteristics)

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

$ sudo apt install bluetooth bluez libbluetooth-dev libudev-dev # install blutooth libraries

$ sudo hciconfig hci0 up     # activate Blutooth functionality

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

