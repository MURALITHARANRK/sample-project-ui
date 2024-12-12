import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-details-modal',
  imports: [],
  templateUrl: './personal-details-modal.component.html',
  styleUrl: './personal-details-modal.component.css'
})
export class PersonalDetailsModalComponent {

  toggleEdit(field:any) {
    const textElement:any = document.getElementById(`${field}-text`);
    const inputElement:any = document.getElementById(`${field}-input`);

    if (textElement.classList.contains('d-none')) {
      textElement.textContent = inputElement.value;
      textElement.classList.remove('d-none');
      inputElement.classList.add('d-none');
    } else {
      textElement.classList.add('d-none');
      inputElement.classList.remove('d-none');
      inputElement.focus();
    }
  }
}
