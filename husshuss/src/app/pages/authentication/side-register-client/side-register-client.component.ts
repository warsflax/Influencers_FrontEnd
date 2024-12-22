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
  selector: 'app-side-register-client',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register-client.component.html',
  styleUrl: './side-register-client.component.scss'
})
export class SideRegisterClientComponent {

  registerForm: FormGroup;

  constructor(
    private form : FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.form.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      fullName : ['',[Validators.required]] , 
      userType : ['',[Validators.required]] 
    });
  }


  onSubmit() {
    
    if (this.registerForm.valid) {
      const { email, password, confirmPassword, userType, fullName} = this.registerForm.value;

      // Vérifier si le mot de passe et la confirmation correspondent
      if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas");
        return;
      }

      // Définir les valeurs par défaut pour les champs supplémentaires
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
          this.router.navigate(['/authentication/login']); // Rediriger vers la page de connexion après l'inscription
        },
        error => {
          console.error('Erreur lors de l\'inscription', error);
          alert('Erreur lors de l\'inscription');
        }
      );
    }
  }


}
