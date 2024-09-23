import "#core/load-env.js";
import express from "express";
import path from "path";
import url from "url";
import { createRestApiServer, connectToDBServer } from "#core/servers/index.js";
import { bookingAirbnbApi } from "#pods/booking-airbnb/booking-airbnb.api.js";
import { envConstants } from "#core/constants/index.js";

const app = createRestApiServer();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const staticFilesPath = path.resolve(__dirname, envConstants.STATIC_FILES_PATH);

app.use("/", express.static(staticFilesPath));

app.use("/api/booking", bookingAirbnbApi);

app.listen(envConstants.PORT, async () => {
  if (!envConstants.isApiMock) {
    await connectToDBServer(envConstants.MONGODB_URI);
    console.log("Connected to DB");
  } else {
    console.log("Running API mock");
  }
  console.log(`Server ready at port ${envConstants.PORT}`);
});
