import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IsAdminGuard } from "./auth/is-admin.guard";

const routes: Routes = [
	{
		path: "dashboard",
		loadChildren: () =>
			import("./dashboard/dashboard.module").then(
				(module) => module.DashboardModule
			),
		canActivate: [IsAdminGuard],
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
