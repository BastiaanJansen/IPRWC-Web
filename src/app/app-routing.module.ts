import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
	{
		path: "dashboard",
		loadChildren: () =>
			import("./dashboard/dashboard.module").then(
				(module) => module.DashboardModule
			),
	},
	{
		path: "auth",
		loadChildren: () =>
			import("./auth/auth.module").then((module) => module.AuthModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
