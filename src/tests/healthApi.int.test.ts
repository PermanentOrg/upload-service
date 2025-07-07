import request from "supertest";
import { app } from "../app";
import { STSClient } from "@aws-sdk/client-sts";

jest.mock("@aws-sdk/client-sts");
const mockSend = jest.fn();
(STSClient as jest.Mock).mockImplementation(() => ({
	send: mockSend,
}));

const agent = request(app);

describe("health API #int", () => {
	describe("GET /api/health", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it("should return an unavailable status if AWS cannot generate an identity", async () => {
			mockSend.mockRejectedValueOnce(new Error("simulated failure"));

			const response = await agent.get("/api/health");

			expect(response).toMatchObject({
				body: {
					status: "unavailable",
					message: expect.stringMatching(/simulated failure/) as unknown,
				},
			});
		});

		it("should return an available status if AWS can generate an identity", async () => {
			mockSend.mockResolvedValueOnce({
				UserId: "test-user",
				Account: "123456789012",
				Arn: "arn:aws:sts::123456789012:user/test-user",
			});

			const response = await agent.get("/api/health");

			expect(response).toMatchObject({
				body: { status: "available", message: "OK" },
			});
		});
	});
});
