import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartComponent } from "./cart/cart.component";
import { RouterModule } from "@angular/router";
import { CartRoutingModule } from "./cart-routing.module";
import { CartItemsRowComponent } from "./cart-items-row/cart-items-row.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { StepperComponent } from "./cart-items-row/stepper/stepper.component";
import { ProductModule } from "../product/product.module";

@NgModule({
	declarations: [CartComponent, CartItemsRowComponent, StepperComponent],
	imports: [
		CommonModule,
		RouterModule,
		CartRoutingModule,
		FontAwesomeModule,
		ProductModule,
	],
})
export class CartModule {}
