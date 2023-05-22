import request from "supertest";
import { app } from "../app";

jest.mock("@aws-sdk/s3-presigned-post");
jest.mock("@aws-sdk/client-s3");

describe("fileDestinationUrl API #int", () => {
  const agent = request(app);
  describe("POST /api/fileDestinationUrl", () => {
    it("should specify all validation details when passed no parameters", async () => {
      const response = await agent.post("/api/fileDestinationUrl").expect(400);

      expect(response.body).toMatchSnapshot();
    });

    it("should specify all validation details when passed a negative maxSize", async () => {
      const response = await agent
        .post("/api/fileDestinationUrl")
        .send({
          maxSize: -1,
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });

    it("should return an S3 URL when passed the proper parameters", async () => {
      const response = await agent
        .post("/api/fileDestinationUrl")
        .send({
          bucket: "permanent-tests",
          path: "my_example_path",
          fileType: "image/png",
          fileName: "example.png",
          maxSize: 5000000,
        })
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });
  });
});
