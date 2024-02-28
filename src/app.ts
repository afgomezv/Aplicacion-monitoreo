import { envs } from "./config/plugins/env.plugin";
import { MongoDataBase } from "./data/mongo";
import { Server } from "./presentacion/server";

(async () => {
  main();
})();

async function main() {
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  Server.start();
}
