enum HealthStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

const getHealth = (): HealthStatus => HealthStatus.AVAILABLE;

export const healthService = {
  getHealth,
};
