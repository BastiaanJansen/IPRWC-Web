import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { User } from "./user.model";

@Injectable({
	providedIn: "root",
})
export class UserService {
	constructor(private http: HttpClient) {}

	update(id: number, dto: UpdateUserDTO): Observable<User> {
		const observable: Observable<User> = this.http.patch<User>(`/users/${id}`, {
			...dto
		});
		
		return observable;
	}
}
