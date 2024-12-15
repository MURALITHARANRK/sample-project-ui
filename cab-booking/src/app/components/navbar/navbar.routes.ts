import { Routes } from "@angular/router";
import { authGuard } from "../../guards/auth-guard/auth.guard";
import { userGuard } from "../../guards/user-guard/user.guard";
import { driverGuard } from "../../guards/driver-guard/driver.guard";
import { CarDetailsModelComponent } from "./car-details-model/car-details-model.component";

export const navbarRoutes: Routes = [
    {
        path: 'navbar',
        loadComponent: ()=>import('./navbar.component').then(c=>c.NavbarComponent),
        canActivate: [authGuard],
        children: [
            {
                path: 'home',
                loadComponent: ()=>import('./home/home.component').then(c=>c.HomeComponent)
            },
            {
                path: 'user-booking',
                loadComponent: ()=>import('./users/user-booking/user-booking.component').then(c=>c.UserBookingComponent),
                canActivate: [userGuard]
            },
            {
                path: 'driver-ride',
                loadComponent: ()=>import('./drivers/driver-ride/driver-ride.component').then(c=>c.DriverRideComponent),
                canActivate: [driverGuard]
            }
        ]
    }
]