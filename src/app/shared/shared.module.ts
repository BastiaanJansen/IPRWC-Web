import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { ModalComponent } from "./modal/modal.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownSelectedDirective } from './dropdown/dropdown-selected.directive';
import { DropdownOptionDirective } from './dropdown/dropdown-option.directive';

@NgModule({
	declarations: [HeaderComponent, ModalComponent, DropdownComponent, DropdownSelectedDirective, DropdownOptionDirective],
	imports: [CommonModule, FontAwesomeModule],
	exports: [HeaderComponent],
})
export class SharedModule {}
