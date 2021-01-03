import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Filter } from "../shared/filter";
import { FindAllResponse } from "../shared/find-all-response";
import { Brand } from "./brand.model";
import { CreateBrandDTO } from "./dto/create-brand.dto";
import { UpdateBrandDTO } from "./dto/update-brand.dto";

@Injectable({ providedIn: "root" })
export class BrandService {
	changedSubject = new Subject<Brand>();

	constructor(private http: HttpClient) {}

	findAll(filter?: Filter): Observable<FindAllResponse<Brand>> {
		const observable: Observable<FindAllResponse<Brand>> = this.http.get<
			FindAllResponse<Brand>
		>("/brands", {
			params: filter as HttpParams,
		});

		return observable;
	}

	create(dto: CreateBrandDTO): Observable<Brand> {
		const observable: Observable<Brand> = this.http.post<Brand>("/brands", {
			...dto
		});

		return observable;
	}

	update(brandID: number, dto: UpdateBrandDTO): Observable<Brand> {
		const observable: Observable<Brand> = this.http.patch<Brand>(`/brands/${brandID}`, {
			...dto
		});
		return observable;
	}

	delete(brandID: number): Observable<Object> {
		return this.http.delete(`/brands/${brandID}`);
	}
}
