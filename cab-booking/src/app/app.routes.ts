import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

    {
        path: 'login',
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
    }

];
