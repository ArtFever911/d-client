const spawnClusters = require('./cluster.js');
const cfonts = require('cfonts');

const title = cfonts.render('Glory to Ukraine', {
    gradient: ['blue', 'yellow'],
    transitionGradient: true,
    font: 'tiny'
}).string

console.log(`${title.slice(0, title.length - 2)}`)

spawnClusters();