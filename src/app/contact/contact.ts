// contact.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  contactForm = {
    fullName: '',
    email: '',
    message: ''
  };

  submitForm() {
    if (!this.contactForm.fullName || !this.contactForm.email || !this.contactForm.message) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // 🚀 Envoi du formulaire (à implémenter plus tard)
    console.log('Formulaire soumis :', this.contactForm);

    // Réinitialiser le formulaire
    this.contactForm = {
      fullName: '',
      email: '',
      message: ''
    };

    alert('Merci pour votre message ! Nous vous répondrons bientôt.');
  }
}