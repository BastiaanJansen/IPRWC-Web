import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { FindAllResponse } from "../shared/find-all-response";
import { HTTPResponse } from "../shared/http-response";
import { FilterProductDTO } from "./filter-product.dto";
import { Product } from "./product.model";
import { map } from "rxjs/operators";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";

@Injectable({ providedIn: "root" })
export class ProductService {
	changedSubject = new Subject<Product>();

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

	create(dto: CreateProductDTO): Observable<Product> {
		const observable: Observable<Product> = this.http.post<Product>("/products", {
			...dto
		});

		return observable;
	}

	update(productID: number, dto: UpdateProductDTO): Observable<Product> {
		const observable: Observable<Product> = this.http.patch<Product>(`/products/${productID}`, {
			...dto
		})

		return observable;
	}

	delete(productID: number): Observable<Object> {
		return this.http.delete(`/products/${productID}`);
	}
}
