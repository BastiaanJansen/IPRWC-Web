import { Component, OnInit } from "@angular/core";
import { NgControl, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/user/user.model";
import { AuthService } from "../auth.service";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {}

	register(form: NgForm): void {
		const values = form.value;

		this.authService.register(values).subscribe((user: User) => {
			this.authService
				.login({ email: user.email, password: values.password })
				.subscribe(() => {
					this.router.navigate([""]);
				});
		});
	}

	hasErrors(viewChild: NgControl): boolean {
		return viewChild.invalid && viewChild.dirty && viewChild.touched;
	}
}
