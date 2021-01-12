import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { User } from "../user/user.model";
import { LoginDTO } from "./dto/login.dto";
import { RegisterDTO } from "./dto/register.dto";
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

	login(dto: LoginDTO): Observable<User> {
		const observable: Observable<User> = this.http
			.post<LoginInfo>("/auth/login", dto)
			.pipe(
				tap((loginInfo: LoginInfo): void => {
					this.handleAuthentication(loginInfo);
				}),
				map((loginInfo: LoginInfo): User => loginInfo.user)
			);
		return observable;
	}

	register(dto: RegisterDTO): Observable<User> {
		const observable: Observable<User> = this.http.post<User>(
			"/auth/register",
			{
				...dto,
			}
		);

		return observable;
	}

	isLoggedIn = (): boolean => !!this.loginInfo.getValue();

	autoLogin(): void {
		const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
		if (!loginInfo) return;
		this.loginInfo.next(loginInfo);
	}

	changeUser(user: User): void {
		const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
		if (!loginInfo) return;

		loginInfo.user = user;

		this.handleAuthentication(loginInfo);
	}

	private handleAuthentication(loginInfo: LoginInfo): void {
		this.loginInfo.next(loginInfo);
		localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
	}
}
