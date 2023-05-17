declare interface HttpClientResponse<T> {
	status: number;
	code: number;
	data: T;
	error?: unknown;
	message?: string;
}

declare interface AxiosData<T> {
	code: number;
	message: string;
	data: T;
}
