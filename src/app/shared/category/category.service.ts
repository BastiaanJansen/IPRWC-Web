import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "./category.model";
import { FindAllResponse } from "../find-all-response";

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
