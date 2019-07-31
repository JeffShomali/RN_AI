const bleno = require("bleno");

const UUID = "U";
const MINOR = 2;
const MAJOR = 1;
const TX_POWER = -60;

console.log("Starting bleno...");

bleno.on("stateChange", state => {

    if (state === 'poweredOn') {
        console.log("Starting broadcast...");

        bleno.startAdvertisingIBeacon(UUID, MAJOR, MINOR, TX_POWER, err => {
            if(err) {
                console.error(err);
            } else {
                console.log(`Broadcasting as iBeacon uuid:${UUID}, major: ${MAJOR}, minor: ${MINOR}`);
            }
        });
    } else {
        console.log("Stopping broadcast...");
        bleno.stopAdvertising();
    }
});