const fs = require('fs');
const path = require('path');
const { red, blue } = require('colorette');

const info = (message) => {
    const timestamp = new Date().toISOString();
    const logData = `INFO - ${timestamp} - ${message}`;
    console.log(blue(logData));
}

const error = (message) => {
    const timestamp = new Date().toISOString();
    const logData = `ERROR - ${timestamp} - ${message}`;
    console.log(red(logData));
}

module.exports = {
    info,
    error
};