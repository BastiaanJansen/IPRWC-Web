import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FindAllResponse } from "../shared/find-all-response";
import { Brand } from "./brand.model";

@Injectable({ providedIn: "root" })
export class BrandService {
	constructor(private http: HttpClient) {}

	findAll(): Observable<FindAllResponse<Brand>> {
		const observable: Observable<FindAllResponse<Brand>> = this.http.get<
			FindAllResponse<Brand>
		>("/brands");

		return observable;
	}
}
