import { STS } from 'aws-sdk';

export enum HealthStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

export interface HealthReport {
  status: HealthStatus;
  message: string;
}

const getCallerIdentity = async (): Promise<STS.GetCallerIdentityResponse> => {
  const sts = new STS();
  return sts.getCallerIdentity().promise();
};

const getHealth = async (): Promise<HealthReport> => {
  try {
    await getCallerIdentity();
  } catch (err: unknown) {
    let message = 'unknown error';
    if (err instanceof Error) {
      message = err.message;
    }
    return {
      status: HealthStatus.UNAVAILABLE,
      message: `Could not get a caller identity (${message})`,
    };
  }
  return {
    status: HealthStatus.AVAILABLE,
    message: 'OK',
  };
};

export const healthService = {
  getHealth,
};
