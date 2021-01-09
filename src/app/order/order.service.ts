import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { Order } from "./order.model";

@Injectable({
	providedIn: "root",
})
export class OrderService {
    constructor(private http: HttpClient) {}
    
    create(userID: number, dto: CreateOrderDTO): Observable<Order> {
        const observable: Observable<Order> = this.http.post<Order>(`/users/${userID}/orders`, {
            ...dto
        });
        return observable;
    }
}
