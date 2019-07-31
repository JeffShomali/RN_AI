# React Native Bluetooth Low Energy(BLE) Scanner

- [Environment Setup](#environment-setup)
  - [Setup Raspberry PI3](#setup-raspberry-pi3)
    - [Setup network](#setup-network)
    - [Setup SSH](#setup-ssh)
    - [Setup Node and NPM](#setup-node-and-npm)

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

$ ifconfig wlan0 # check to see if wifi is working # inet addr:192.168.1.21
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