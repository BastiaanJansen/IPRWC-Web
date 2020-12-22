import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { User } from "../user/user.model";
import { loginDTO } from "./dto/login.dto";
import { LoginInfo } from "./login-info.model";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	loginInfo: BehaviorSubject<LoginInfo> = new BehaviorSubject<LoginInfo>(
		null
	);

	constructor(private http: HttpClient) {}

	logout(): void {
		this.loginInfo.next(null);
		localStorage.removeItem("loginInfo");
	}

	login(dto: loginDTO): Observable<User> {
		const observer: Observable<User> = this.http
			.post<LoginInfo>("/auth/login", dto)
			.pipe(
				map((response: any) => response.result),
				tap((loginInfo: LoginInfo): void => {
					this.handleAuthentication(loginInfo);
				}),
				map((loginInfo: LoginInfo): User => loginInfo.user)
			);
		return observer;
	}

	isLoggedIn = (): boolean => !!this.loginInfo.getValue();

	autoLogin(): void {
		const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
		if (!loginInfo) return;
		this.loginInfo.next(loginInfo);
	}

	private handleAuthentication(loginInfo: LoginInfo): void {
		this.loginInfo.next(loginInfo);
		localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
	}
}
