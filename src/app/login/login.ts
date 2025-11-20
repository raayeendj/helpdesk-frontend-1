import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.auth.login(email, password).subscribe({
        next: (resp) => {
          this.auth.saveSession(resp);
          const role = resp.user.role;
          if (role === 'Admin') {
            this.router.navigateByUrl('/dashboard');
          } else {
            this.router.navigateByUrl('/tickets/new');
          }
        },
        error: () => {
          // Afficher une alerte en cas d'email/mot de passe incorrect
          this.errorMessage = 'Adresse e-mail ou mot de passe incorrect.';
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir correctement le formulaire.';
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
