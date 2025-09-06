import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Simulation de vérification de connexion
      if (email === 'user@gmail.com' && password === '1234') {
        this.errorMessage = '';
        this.router.navigateByUrl('/dashboard'); // Redirection vers le dashboard
      } else {
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    } else {
      this.errorMessage = 'Veuillez remplir correctement le formulaire.';
    }
  }
}
