const cluster = require('cluster');
const logger = require('./logger');

const [clusters, host, amount] = process.argv.slice(2, process.argv.length)

const spawnClusters = () => {
    if (!clusters) {
        throw new Error('Please specify clusters quantity.')
    }
    cluster.setupMaster({
        exec: `${process.cwd()}/performer.js`,
        args: [host, amount]
    })

    for (let i = 0; i < clusters; i++) {
        cluster.fork()
        logger.info('Spawned cluster')
    }

    cluster.on('error', (worker, code, signal) => logger.error(`Cluster ${worker.process.pid} stopped with error -${signal}`))

    cluster.on(
        'exit',
        (worker, code, signal) => code === 0 ?
            logger.info(`Cluster ${worker.process.pid} finished successfully`) :
            logger.error(`Cluster ${worker.process.pid} stopped with error -${signal}`)
    )
}

module.exports = spawnClusters;
