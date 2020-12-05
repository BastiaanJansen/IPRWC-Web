import { HTTPResponse } from "./http-response";

export class FindAllResponse<T> extends HTTPResponse<T[]> {
	count: number;
}
