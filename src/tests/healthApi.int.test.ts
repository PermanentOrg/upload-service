import request from 'supertest';
import type { HealthReport } from '../services/health.service';
import { app } from '../app';

interface GetHealthApiResponse {
  body: HealthReport;
}

interface MockGetCallerIdentity {
  promise: jest.Mock;
}

interface MockSTS {
  getCallerIdentity: () => MockGetCallerIdentity;
}

// Note: Jest requires this variable to be prefixed with `mock` in order for us to use it
// as the mocked return value of the STS constructor.  Failure to comply will cause Jest to
// complain about out-of-scope variables.
// The reason we need to define it here is so that we can manipulate the mock implementation
// output in our tests.
const mockGetCallerIdentityPromise = jest.fn();
jest.mock('aws-sdk', () => ({
  STS: jest.fn().mockImplementation(
    (): MockSTS => ({
      getCallerIdentity: (): MockGetCallerIdentity => ({
        promise: mockGetCallerIdentityPromise,
      }),
    }),
  ),
}));

const agent = request(app);

describe('health API #int', () => {
  describe('GET /api/health', () => {
    it('should return an unavailable status if AWS cannot generate an identity', async () => {
      mockGetCallerIdentityPromise.mockRejectedValueOnce(new Error('simulated failure'));
      const response: GetHealthApiResponse = await agent
        .get('/api/health');

      expect(response.body.status).toBe('unavailable');
      expect(response.body.message).toMatch(/simulated failure/);
    });

    it('should return an available status if AWS can generate an identity', async () => {
      mockGetCallerIdentityPromise.mockResolvedValueOnce('ok');
      const response: GetHealthApiResponse = await agent
        .get('/api/health');
      expect(response.body.status).toBe('available');
    });
  });
});
