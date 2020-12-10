import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartComponent } from "./cart/cart.component";
import { RouterModule } from "@angular/router";
import { CartRoutingModule } from "./cart-routing.module";
import { CartItemsRowComponent } from "./cart-items-row/cart-items-row.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
	declarations: [CartComponent, CartItemsRowComponent],
	imports: [CommonModule, RouterModule, CartRoutingModule, FontAwesomeModule],
})
export class CartModule {}
