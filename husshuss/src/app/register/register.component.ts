import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,CommonModule,MatSelectModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

 
  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, confirmPassword } = this.registerForm.value;

      // Vérifier si le mot de passe et la confirmation correspondent
      if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas");
        return;
      }

      // Définir les valeurs par défaut pour les champs supplémentaires
      const userType = 'Influencer'; // Exemple de valeur par défaut
      const fullName = 'Nom par défaut'; // Exemple de nom par défaut
      const profilePicture = 'https://example.com/default-profile.jpg'; // URL de profil par défaut
      const dateJoined = new Date(); // Date actuelle pour la date d'inscription

      // Créer un objet utilisateur avec tous les champs requis
      const user = {
        email,
        password,
        userType,
        fullName,
        profilePicture,
        dateJoined
      };

      // Appeler le service d'enregistrement avec l'objet complet
      this.authService.register(user).subscribe(
        response => {
          console.log('Inscription réussie', response);
          alert('Inscription réussie');
          this.router.navigate(['/login']); // Rediriger vers la page de connexion après l'inscription
        },
        error => {
          console.error('Erreur lors de l\'inscription', error);
          alert('Erreur lors de l\'inscription');
        }
      );
    }
  }
}
