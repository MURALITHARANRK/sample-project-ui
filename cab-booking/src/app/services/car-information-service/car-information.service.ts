import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarInformationService {

  mockdata=[{
    "registration_number":543,
    "model":'suv',
    "brand":"benz"
  },
  {
    "registration_number":987,
    "model":'sedan',
    "brand":"audi"
  },
{
  "registration_number":687,
    "model":'hatchback',
    "brand":"volkswagen"
},
{
  "registration_number":987,
    "model":'sedan',
    "brand":"bmw"
},
];
constructor() { }

getcarDetails(){
   return this.mockdata;
}
}
