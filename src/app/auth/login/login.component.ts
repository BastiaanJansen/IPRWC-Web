import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/user/user.model";
import { AuthService } from "../auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {}

	login(form: NgForm): void {
		const values = form.value;

		this.authService.login(values).subscribe(() => {
			this.router.navigate([""]);
		});
	}
}
