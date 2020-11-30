import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FindAllResponse } from "../find-all-response";
import { Tag } from "./tag.model";

@Injectable({ providedIn: "root" })
export class TagService {
	constructor(private http: HttpClient) {}

	findAll(): Observable<FindAllResponse<Tag>> {
		const observable: Observable<FindAllResponse<Tag>> = this.http.get<
			FindAllResponse<Tag>
		>("/tags");

		return observable;
	}
}
