import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

    {
        path: 'login/:role',
        loadComponent: ()=>import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: ()=>import('./register/register.component').then(c=>c.RegisterComponent)
    },
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'role',
        loadComponent: ()=>import('./role/role.component').then(c=>c.RoleComponent)
    },
    {
        path: 'navbar',
        loadComponent: ()=>import('./navbar/navbar.component').then(c=>c.NavbarComponent)
    },
    

];
