import {
	STSClient,
	GetCallerIdentityCommand,
	GetCallerIdentityCommandOutput,
} from "@aws-sdk/client-sts";

export enum HealthStatus {
	AVAILABLE = "available",
	UNAVAILABLE = "unavailable",
}

export interface HealthReport {
	status: HealthStatus;
	message: string;
}

const getCallerIdentity = async (): Promise<GetCallerIdentityCommandOutput> => {
	const client = new STSClient({});
	const command = new GetCallerIdentityCommand({});
	return await client.send(command);
};

const getHealth = async (): Promise<HealthReport> => {
	try {
		await getCallerIdentity();
	} catch (err: unknown) {
		let message = "unknown error";
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
		message: "OK",
	};
};

export const healthService = {
	getHealth,
};
