import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Filter } from "../shared/filter";
import { FindAllResponse } from "../shared/find-all-response";
import { Category } from "./category.model";

@Injectable({ providedIn: "root" })
export class CategoryService {
	categoryChangedSubject = new Subject<Category>();

	constructor(private http: HttpClient) {}

	findAll(filter?: Filter): Observable<FindAllResponse<Category>> {
		const observable: Observable<FindAllResponse<Category>> = this.http.get<
			FindAllResponse<Category>
		>("/categories", {
			params: filter as HttpParams,
		});

		return observable;
	}
}
