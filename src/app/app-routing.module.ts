import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductsComponent } from "./webshop/products/products.component";

const routes: Routes = [
	{
		path: "",
		component: ProductsComponent,
	},
	{
		path: "card",
		component: ProductsComponent,
	},
	{
		path: "login",
		component: ProductsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
