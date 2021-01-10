import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { ModalComponent } from "./modal/modal.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { DropdownSelectedDirective } from "./dropdown/dropdown-selected.directive";
import { DropdownOptionDirective } from "./dropdown/dropdown-option.directive";
import { OverviewItemRowDirective } from "./overview-item/overview-item-row.directive";
import { PlaceholderDirective } from "./placeholder.directive";
import { AlertComponent } from "./alert/alert.component";
import { ConfirmModalComponent } from "./confirm-modal/confirm-modal.component";
import { NavComponent } from "./components/nav/nav.component";
import { RouterModule } from "@angular/router";

@NgModule({
	declarations: [
		HeaderComponent,
		ModalComponent,
		DropdownComponent,
		DropdownSelectedDirective,
		DropdownOptionDirective,
		OverviewItemRowDirective,
		PlaceholderDirective,
		AlertComponent,
		ConfirmModalComponent,
		NavComponent,
	],
	imports: [CommonModule, RouterModule, FontAwesomeModule],
	exports: [
		HeaderComponent,
		ModalComponent,
		DropdownComponent,
		DropdownOptionDirective,
		DropdownSelectedDirective,
		OverviewItemRowDirective,
		PlaceholderDirective,
		AlertComponent,
		NavComponent,
	],
})
export class SharedModule {}
