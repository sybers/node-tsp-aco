import express from "express";

import { WelcomeController } from "./controllers";

const app: express.Application = express();

const port: string|number =  process.env.PORT || 3000;

app.use("/", WelcomeController);

app.listen(port, () => {
    console.log(`App is now listening at http://localhost:${port}`);
});
