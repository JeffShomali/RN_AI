#!/bin/bash 
export $(dbus-launch)
eval 'dbus-launch --sh-syntax'
#/usr/libexec/bluetooth/obexd -r /tmp -d -n -a &
/usr/libexec/bluetooth/obexd -r /home/root -d -n -a &
sleep 4
/usr/bin/obexctl

