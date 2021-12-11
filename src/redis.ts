import { createClient } from "redis";

export default () => {
  return new Promise(async (resolve, reject) => {
    const client = createClient({
      url: "redis://redis-19746.c264.ap-south-1-1.ec2.cloud.redislabs.com:19746",
      password: "PWYpQZwkEu7dvfguChgcKr7VgaDKfWI9",
    });

    client.on("error", (err) => {
      console.error("Redis Error: ", err);
      client.quit();
      reject(err);
    });

    await client.connect();
    resolve(client);
  });
};

export const expire = (callback: any) => {
  const expired = () => {
    const sub = createClient({
      url: "redis://redis-19746.c264.ap-south-1-1.ec2.cloud.redislabs.com:19746",
      password: "PWYpQZwkEu7dvfguChgcKr7VgaDKfWI9",
    });

    sub.subscribe("__keyevent@0__:expired", () => {
      sub.on("message", (channel, message) => {
        callback(message);
      });
    });
  };

  // FIXME: sendCommand(). Fire event whenever the time expires
  const pub = createClient({
    url: "redis://redis-19746.c264.ap-south-1-1.ec2.cloud.redislabs.com:19746",
    password: "PWYpQZwkEu7dvfguChgcKr7VgaDKfWI9",
  });
  pub.sendCommand(["set", "notify-keyspace-events", "EX"]);
  expired();
};
