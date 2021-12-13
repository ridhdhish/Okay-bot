import redis, { createClient } from "redis";

const subscriber = createClient({
  url: "redis://redis-19746.c264.ap-south-1-1.ec2.cloud.redislabs.com:19746",
  password: "PWYpQZwkEu7dvfguChgcKr7VgaDKfWI9",
});
subscriber.connect();

const subscribe = async (channel: any, callback: any) => {
  await subscriber.subscribe(channel, (message) => {
    callback(message);
  });
};

export { subscribe };
