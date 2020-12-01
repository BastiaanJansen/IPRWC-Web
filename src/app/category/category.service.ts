import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FindAllResponse } from "../shared/find-all-response";
import { Category } from "./category.model";

@Injectable({ providedIn: "root" })
export class CategoryService {
	constructor(private http: HttpClient) {}

	findAll(): Observable<FindAllResponse<Category>> {
		const observable: Observable<FindAllResponse<Category>> = this.http.get<
			FindAllResponse<Category>
		>("/categories");

		return observable;
	}
}
