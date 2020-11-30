import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FindAllResponse } from "./find-all-response";
import { Product } from "./product.model";

@Injectable({ providedIn: "root" })
export class ProductService {
	constructor(private http: HttpClient) {}

	findAll(): Observable<FindAllResponse<Product[]>> {
		const observable: Observable<
			FindAllResponse<Product[]>
		> = this.http.get<FindAllResponse<Product[]>>(
			"http://localhost:3000/products"
		);

		return observable;
	}
}
