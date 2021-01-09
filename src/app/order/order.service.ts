import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Filter } from "../shared/filter";
import { FindAllResponse } from "../shared/find-all-response";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { Order } from "./order.model";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	constructor(private http: HttpClient) {}

	findAll(filter?: Filter): Observable<FindAllResponse<Order>> {
		const observable: Observable<FindAllResponse<Order>> = this.http.get<
			FindAllResponse<Order>
		>("/orders", {
			params: filter as HttpParams,
		});
		return observable;
	}

	create(userID: number, dto: CreateOrderDTO): Observable<Order> {
		const observable: Observable<Order> = this.http.post<Order>(
			`/users/${userID}/orders`,
			{
				...dto,
			}
		);
		return observable;
	}
}
