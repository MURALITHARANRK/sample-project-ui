import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { navbarRoutes } from './components/navbar/navbar.routes';

export const routes: Routes = [

    {
        path: 'login/:role',
        loadComponent: ()=>import('./components/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: ()=>import('./components/register/register.component').then(c=>c.RegisterComponent)
    },
    {
        path:'',
        redirectTo: 'role',
        pathMatch: 'full'
    },
    {
        path: 'role',
        loadComponent: ()=>import('./components/role/role.component').then(c=>c.RoleComponent)
    },
    ...navbarRoutes
    

];
