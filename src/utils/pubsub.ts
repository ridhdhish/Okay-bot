import redis, { createClient } from "redis";

const subscriber = createClient({
  url: "redis://redis-19746.c264.ap-south-1-1.ec2.cloud.redislabs.com:19746",
  password: "PWYpQZwkEu7dvfguChgcKr7VgaDKfWI9",
});
subscriber.connect();

const publisher = createClient({
  url: "redis://redis-19746.c264.ap-south-1-1.ec2.cloud.redislabs.com:19746",
  password: "PWYpQZwkEu7dvfguChgcKr7VgaDKfWI9",
});
publisher.connect();

const publish = async (channel: any, message: any) => {
  console.log("Publish: ", message);
  await publisher.publish(channel, message);
};

const subscribe = async (channel: any, callback: any) => {
  await subscriber.subscribe(channel, (message) => {
    callback(message);
  });
};

const on = (event: any, callback: any) => {
  subscriber.on(event, (channel, message) => {
    console.log("Inside Event on: ", message);
    callback(channel, message);
  });
};

export { subscribe, publish, on };
