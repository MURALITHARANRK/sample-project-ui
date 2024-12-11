import { Routes } from "@angular/router";
import { authGuard } from "../guards/auth.guard";

export const navbarRoutes: Routes = [
    {
        path: 'navbar',
        loadComponent: ()=>import('./navbar.component').then(c=>c.NavbarComponent),
        canActivate: [authGuard],
        children: [
            {
                path: 'home',
                loadComponent: ()=>import('./home/home.component').then(c=>c.HomeComponent)
            }
        ]
    }
]