#!/usr/bin/env node

'use strict'

const tello = require('tello')

const drone1 = new tello({
  ip: "192.168.43.208",
})

const drone2 = new tello({
  ip: "192.168.43.19",
})

drone1.takeoff()
drone2.takeoff()

setTimeout(() => {
  drone1.sendCommand('up 100')
  drone2.sendCommand('up 100')
}, 5000);

setTimeout(() => {
  drone1.sendCommand('flip f')
  drone2.sendCommand('flip f')
}, 8000);

setTimeout(() => {
  drone1.sendCommand('flip b')
  drone2.sendCommand('flip b')
}, 11000);

setTimeout(() => {
  drone1.sendCommand('flip l')
  drone2.sendCommand('flip r')
}, 14000);

setTimeout(() => {
  drone1.sendCommand('flip r')
  drone2.sendCommand('flip l')
}, 17000);

setTimeout(() => {
  drone1.land()
  drone2.land()
}, 20000);
