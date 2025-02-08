import "dotenv/config";
import server from "./src/app.js";
import { conn } from "./src/database/db.js";

const port = process.env.PORT || 3001;

conn
  .sync({ force: true })
  .then(() => console.log("Database synced successfully"))
  .then(() => {
    server.listen(port, () => {
      console.log("server listening at " + port);
    });
  })
  .catch((error) => console.log(error));
