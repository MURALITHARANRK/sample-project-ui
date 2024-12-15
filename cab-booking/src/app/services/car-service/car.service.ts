import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() {}
  getcardetails(){
    return {reg_number: '1234', availability: 'yes', brand: 'bmw' ,model:'2014'}
  }

  setcardetails(carData: {reg_number:string, availability: string,  brand: string,model:string}){
  
  }
  
}
