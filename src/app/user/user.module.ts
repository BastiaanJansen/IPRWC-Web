import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsComponent } from "./settings/settings.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { UserRoutingModule } from "./user-routing.module";
import { RouterModule } from "@angular/router";

@NgModule({
	declarations: [SettingsComponent],
	imports: [CommonModule, SharedModule, FormsModule, UserRoutingModule, RouterModule],
})
export class UserModule {}
