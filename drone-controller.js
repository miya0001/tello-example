#!/usr/bin/env node

'use strict'

const tello = require('tello')

const controller = new tello({
  ip: "192.168.43.208",
})

setInterval(() => {
  controller.sendCommand('command')
}, 10000);

const drone = new tello({
  ip: "192.168.43.19",
})

drone.takeoff()

const PORT = 8890;
const HOST = '0.0.0.0';

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('listening', () => {
  var address = server.address();
  console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

let flag = true;

server.on('message', (message, remote) => {
  if ("192.168.43.208" === remote.address) {
    const line = message.toString().trim().split(/;/)
    const data = {}
    for (let i = 0; i < line.length; i++) {
      const [key, val] = line[i].split(/:/)
      if (key) {
        data[key] = parseInt(val);
      }
    }

    console.log(`Pitch: ${data['pitch']}`)
    console.log(`Yaw: ${data['yaw']}`)

    if (true === flag && 45 < data['yaw']) {
      flag = false;
      setTimeout(() => {
        flag = true
      }, 3000);
      const command = 'cw 90'
      drone.sendCommand(command)
    } else if (true === flag && -45 > data['yaw']) {
      flag = false;
      setTimeout(() => {
        flag = true
      }, 3000);
      const command = 'ccw 90'
      drone.sendCommand(command)
    } else if (true === flag && 45 < data['pitch']) {
      flag = false;
      setTimeout(() => {
        flag = true
      }, 3000);
      const command = 'back 50'
      drone.sendCommand(command)
    } else if (true === flag && -45 > data['pitch']) {
      flag = false;
      setTimeout(() => {
        flag = true
      }, 3000);
      const command = 'forward 50'
      drone.sendCommand(command)
    }
  }
});

server.bind(PORT, HOST);