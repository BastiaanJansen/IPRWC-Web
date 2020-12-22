import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Filter } from "../shared/filter";
import { FindAllResponse } from "../shared/find-all-response";
import { Brand } from "./brand.model";

@Injectable({ providedIn: "root" })
export class BrandService {
	constructor(private http: HttpClient) {}

	findAll(filter?: Filter): Observable<FindAllResponse<Brand>> {
		const observable: Observable<FindAllResponse<Brand>> = this.http.get<
			FindAllResponse<Brand>
		>("/brands", {
			params: filter as HttpParams,
		});

		return observable;
	}
}
