#!/usr/bin/env node

const { program } = require('commander')

// // action
// program.action(cmd => console.log('✓ Running!!'))

// action
program.action(cmd => require("./covid").run().then(v => console.log(v)))

program.parse(process.argv)