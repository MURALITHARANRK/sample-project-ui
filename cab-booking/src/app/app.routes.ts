import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { navbarRoutes } from './components/navbar/navbar.routes';
import { CarDetailsModelComponent } from './components/navbar/car-details-model/car-details-model.component';
import { DriverDetailsComponent } from './components/navbar/Admin/driver-details/driver-details.component';

export const routes: Routes = [

    {
        path: 'login',
        loadComponent: ()=>import('./components/login/login.component').then(c => c.LoginComponent)
    },
    {
path:'driver-details',
component:DriverDetailsComponent,
    },
    {
        path: 'register',
        loadComponent: ()=>import('./components/register/register.component').then(c=>c.RegisterComponent)
    },
    
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    
    ...navbarRoutes,
    
    

];
