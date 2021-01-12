import { Component, OnInit, ViewChild } from "@angular/core";
import { NgControl, NgForm } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { AlertComponent } from "src/app/shared/alert/alert.component";
import { ModalService } from "src/app/shared/modal/modal.service";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";
import { User } from "../user.model";
import { UserService } from "../user.service";

@Component({
	selector: "app-settings",
	templateUrl: "./settings.component.html",
	styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
    user: User;

    @ViewChild(PlaceholderDirective, { static: false }) modalHost: PlaceholderDirective;

	constructor(private authService: AuthService, private userService: UserService, private modalService: ModalService) {}

	ngOnInit(): void {
        this.user = this.authService.loginInfo.getValue().user;
    }

    save(form: NgForm): void {
        const values = form.value;

        this.userService.update(this.user.id, values).subscribe((user: User) => {
            this.authService.changeUser(user);
            const modal = this.modalService.createModal(AlertComponent, this.modalHost);
            modal.instance.title = "Instellingen gewijzigd";
        }, (error) => {
            const modal = this.modalService.createModal(AlertComponent, this.modalHost);
            modal.instance.title = error.error.error.message;
        })
    }

    hasErrors(viewChild: NgControl): boolean {
		return viewChild.invalid && viewChild.dirty && viewChild.touched;
	}
}
