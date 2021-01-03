import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Filter } from "../shared/filter";
import { FindAllResponse } from "../shared/find-all-response";
import { Category } from "./category.model";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdateCategoryDTO } from "./dto/update-category.dto";

@Injectable({ providedIn: "root" })
export class CategoryService {
	changedSubject = new Subject<Category>();

	constructor(private http: HttpClient) {}

	findAll(filter?: Filter): Observable<FindAllResponse<Category>> {
		const observable: Observable<FindAllResponse<Category>> = this.http.get<
			FindAllResponse<Category>
		>("/categories", {
			params: filter as HttpParams,
		});

		return observable;
	}

	create(dto: CreateCategoryDTO): Observable<Category> {
		const observable: Observable<Category> = this.http.post<Category>("/categories", {
			...dto
		});
		return observable;
	}

	update(categoryID: number, dto: UpdateCategoryDTO): Observable<Category> {
		const observable: Observable<Category> = this.http.patch<Category>(`/categories/${categoryID}`, {
			...dto
		})
		return observable;
	}

	delete(categoryID: number): Observable<Object> {
		return this.http.delete(`/categories/${categoryID}`);
	}
}
