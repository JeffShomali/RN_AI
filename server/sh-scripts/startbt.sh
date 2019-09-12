#!/bin/bash 
modprobe bcm43455 && hciattach /dev/ttymxc0 bcm43xx 3000000 flow -b -t 120
#systemctl restart bluetooth
/etc/init.d/bluetooth stop
/etc/init.d/bluetooth start
hciconfig hci0 up
bluetoothctl
# systemctl --global is-enabled obex
# systemctl --user is-enabled obex
# systemctl --global is-enabled obex
# systemctl --user is-enabled obex
#export $(dbus-launch)
#eval 'dbus-launch --sh-syntax'
#/usr/libexec/bluetooth/obexd -r /tmp -d -n -a &

