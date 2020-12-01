import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FindAllResponse } from "../find-all-response";
import { FilterProductDTO } from "./filter-product.dto";
import { Product } from "./product.model";

@Injectable({ providedIn: "root" })
export class ProductService {
	constructor(private http: HttpClient) {}

	findAll(filter?: FilterProductDTO): Observable<FindAllResponse<Product>> {
		const observable: Observable<FindAllResponse<Product>> = this.http.get<
			FindAllResponse<Product>
		>("/products", {
			params: filter as HttpParams,
		});

		return observable;
	}
}
