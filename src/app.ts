const express = require("express");
import config  from "config";
import connect from "./db/connect";
import routes from "./routes";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(express.urlencoded({extended :false}));
app.use(express.json({
    type: ['application/json', 'text/plain']
  }))
app.listen(port,host,() => {
    console.log("Server listening at http:// "+host + ":"+port);
    connect();
    routes(app);
})
