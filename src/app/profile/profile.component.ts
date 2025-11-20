import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  avatarPreview: string | ArrayBuffer | null = null;
  avatarFile: File | null = null;

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  message: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    this.avatarFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  uploadAvatar() {
    if (!this.avatarFile) {
      this.message = 'No file selected.';
      return;
    }
    // TODO: wire to backend upload endpoint. For now just simulate.
    console.log('Uploading avatar', this.avatarFile);
    this.message = 'Avatar uploaded (simulation). Refresh to see changes.';
  }

  changePassword() {
    this.message = null;
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.message = 'Please fill all password fields.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'New password and confirmation do not match.';
      return;
    }
    // TODO: call backend API to change password, handle errors and success.
    console.log('Changing password', { current: this.currentPassword, new: this.newPassword });
    this.message = 'Password changed (simulation).';
    this.currentPassword = this.newPassword = this.confirmPassword = '';
  }
}
