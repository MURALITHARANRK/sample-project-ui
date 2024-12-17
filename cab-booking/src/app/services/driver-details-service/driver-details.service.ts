import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriverDetailsService {

  
  mockdata=[{
    "id":1,
    "username":'Alex'
  },
  {
  "id":2,
  "username":'Gerorge'
},
{
  "id":3,
  "username":'Jack'
},
{
  "id":4,
  "username":'John'
},
];
constructor() { }

getdriverDetails(){
   return this.mockdata;
}
}
