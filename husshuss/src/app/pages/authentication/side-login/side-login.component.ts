import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,FormBuilder,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/AuthService';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  form: FormGroup
  constructor( private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.form = this.fb.group({
      email: ['toto12@gmail.com', [Validators.required, Validators.email]],
      password: ['totototo', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        response => {
          console.log('Connexion réussie', response);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Erreur de connexion', error);
          alert('Email ou mot de passe incorrect');
        }
      );
    }
  }
}
