import express from "express";
import { fileDestinationUrlController, healthController } from "../controllers";

const apiRoutes = express.Router();
apiRoutes.get("/health", healthController.getHealth);
apiRoutes.post(
  "/fileDestinationUrl",
  fileDestinationUrlController.createFileDestinationUrl
);
apiRoutes.post(
  "/startMultipartUpload",
  fileDestinationUrlController.startMultipartUpload
);
apiRoutes.post(
  "/multipartUploadUrls",
  fileDestinationUrlController.createMultipartUploadUrls
);
apiRoutes.post(
  "/completeMultipartUpload",
  fileDestinationUrlController.completeMultipartUpload
);
export { apiRoutes };
