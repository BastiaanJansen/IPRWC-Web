import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Filter } from "../shared/filter";
import { FindAllResponse } from "../shared/find-all-response";
import { CreateTagDTO } from "./dto/create-tag.dto";
import { EditTagDTO } from "./dto/edit-tag.dto";
import { Tag } from "./tag.model";

@Injectable({ providedIn: "root" })
export class TagService {
	changedSubject = new Subject<Tag>();

	constructor(private http: HttpClient) {}

	findAll(filter?: Filter): Observable<FindAllResponse<Tag>> {
		const observable: Observable<FindAllResponse<Tag>> = this.http.get<
			FindAllResponse<Tag>
		>("/tags", {
			params: filter as HttpParams
		});

		return observable;
	}

	create(dto: CreateTagDTO): Observable<Tag> {
		const observable: Observable<Tag> = this.http.post<Tag>("/tags", {
			...dto
		});

		return observable;
	}

	update(tagID: number, dto: EditTagDTO): Observable<Tag> {
		const observable: Observable<Tag> = this.http.patch<Tag>(`/tags/${tagID}`, {
			...dto
		});
		return observable;
	}

	delete(tagID: number): Observable<Object> {
		return this.http.delete(`/tags/${tagID}`);
	}
}
