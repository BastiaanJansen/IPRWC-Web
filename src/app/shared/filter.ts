export class Filter {
	skip?: number;
	take?: number;
	order?: string;
	orderDirection?: OrderDirection;
}

export enum OrderDirection {
	ASC = "ASC",
	DESC = "DESC",
}
