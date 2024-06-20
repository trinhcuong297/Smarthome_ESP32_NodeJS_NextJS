// import { configDotenv } from "dotenv";
import app from "./src/application.service.app.js";
import process from "process";
import followingService from "./src/following.service.app.js";
import controlService from "./src/control.service.app.js";
// configDotenv();

const port = 3005 || 3001;
const following_servicePort = 3007 || 3002;
const control_servicePort = 5000 || 3003;


const server_1 = app.listen(port, () => {
  console.log("Listening on port ", port);
});

const server_2 = followingService.listen(following_servicePort, () => {
  console.log("Listening on port ", following_servicePort);
});

const server_3 = controlService.listen(control_servicePort, () => {
  console.log("Listening on port ", control_servicePort);
});


process.on("SIGINT", () => {
  server_1.close(() => console.log("Server 1 exit!"));
  server_2.close(() => console.log("Server 2 exit!"));
  server_3.close(() => console.log("Server 3 exit!"));
});

