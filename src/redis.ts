import redis from "redis";

export default async () => {
  return new Promise((resolve, reject) => {
    const client = redis.createClient({
      url: process.env.REDIS_URI,
    });

    client.on("error", (err) => {
      console.log(err);
      client.quit();
      reject(err);
    });

    client.on("ready", () => {
      console.log("Redis Server is running");
      resolve(client);
    });
  });
};
