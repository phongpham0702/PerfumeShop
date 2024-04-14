const redis = require("redis");


let statusConnectRedis = {
    CONNECT:'connect',
    END: 'end',
    RECONNECT: 'reconnecting',
    ERROR: 'error'
}

const REDIS_CONNECT_TIMEOUT = 10000 //10s

const handleEventConnection = (connectRedis) => {
    
    connectRedis.on(statusConnectRedis.CONNECT,() => {
        console.log(`Connect Redis: Connected`);
    }),

    connectRedis.on(statusConnectRedis.END,() => {
        console.log(`Connect Redis: Disconnected`);
    }),

    connectRedis.on(statusConnectRedis.RECONNECT,() => {
        console.log(`Connect Redis: Reconnecting`);
    }),

    connectRedis.on(statusConnectRedis.ERROR,(err) => {
        console.log(`Connect Redis: Error ${err}`);
    })

}

let client = redis.createClient({
    password: process.env.REDIS_PASSWORD,

    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

handleEventConnection(client)

async function connect_redis()
{
    await client.connect()
}

function get_Redis()
{
    return client
}

function close_Redis()
{
    if (client) {
        client.quit();
    }
}

module.exports = {
    connect_redis,
    get_Redis,
    close_Redis
}