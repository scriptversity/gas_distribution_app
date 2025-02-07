import "dotenv/config";
import server from "./src/app.js";
import { conn } from "./src/database/db.js";

const port = process.env.PORT || 3001;
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
    console.log("server listening at " + port);
  });
});
