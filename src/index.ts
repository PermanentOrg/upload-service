import "./instrument";
import { app } from "./app";
import { logger } from "./log";

const DEFAULT_PORT = 3000;
const port = process.env.PORT ?? DEFAULT_PORT;
app.listen(port, () => {
	logger.info(`upload-service listening on port ${port}`);
});
