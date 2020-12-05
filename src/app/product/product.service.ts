import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FindAllResponse } from "../shared/find-all-response";
import { HTTPResponse } from "../shared/http-response";
import { FilterProductDTO } from "./filter-product.dto";
import { Product } from "./product.model";
import { map } from "rxjs/operators";

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

	findByID(id: number): Observable<Product> {
		const observable: Observable<Product> = this.http
			.get<HTTPResponse<Product>>(`/products/${id}`)
			.pipe(
				map((result) => {
					return result.result;
				})
			);
		return observable;
	}
}
