import { createClient } from "redis";

export default () => {
  return new Promise(async (resolve, reject) => {
    const client = createClient({
      url: "redis://redis-19746.c264.ap-south-1-1.ec2.cloud.redislabs.com:19746",
      password: "PWYpQZwkEu7dvfguChgcKr7VgaDKfWI9",
    });

    await client.connect();

    client.on("error", (err) => {
      console.error("Redis Error: ", err);
      client.quit();
      reject(err);
    });

    client.on("ready", () => {});

    resolve(client);
  });
};
