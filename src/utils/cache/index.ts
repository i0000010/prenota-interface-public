import { createClient } from 'redis';
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from '../../config.js';

console.log("creating redis client")
const client = createClient({
    password: REDIS_PASSWORD,
    socket: {
        'host': REDIS_HOST,
        'port': REDIS_PORT
    }
});

export const redisPubClient = client.duplicate();
await redisPubClient.connect();
console.log('created redis pub client');

await client.connect();
console.log("created redis client");


export { client as redisClient };


process.on('exit', async () => {
    await client.quit();
});

process.on('SIGINT', async () => {
    await client.quit();
});