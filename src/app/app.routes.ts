import { Routes } from "@angular/router";
import { APP_TITLE } from "./app.constants";

export const routes: Routes = [
  {
    path: "",
    title: APP_TITLE,
    loadComponent: () => import("@features/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "**",
    redirectTo: "",
  },
];
