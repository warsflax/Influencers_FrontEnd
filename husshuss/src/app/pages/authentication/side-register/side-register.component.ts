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
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  registerForm: FormGroup;

  constructor(
    private form : FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.form.group({
      
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required]],
      FullName : ['',[Validators.required]] , 
      UserType : ['',[Validators.required]] 
    });
  }


  submit() {
    
    if (this.registerForm.valid) {
      const { Email, Password, ConfirmPassword, UserType, FullName} = this.registerForm.value;
      debugger
      console.log(Password)
      console.log(ConfirmPassword)

      // Vérifier si le mot de passe et la confirmation correspondent
      if (Password != ConfirmPassword) {
        alert("Les mots de passe ne correspondent pas");
        return;
      }

      // Définir les valeurs par défaut pour les champs supplémentaires
      const ProfilePicture = 'https://example.com/default-profile.jpg'; // URL de profil par défaut
      const DateJoined = new Date(); // Date actuelle pour la date d'inscription

      // Créer un objet utilisateur avec tous les champs requis
      const user = {
        Email,
        Password,
        UserType,
        FullName,
        ProfilePicture,
        DateJoined
      }; 		
      // Stocker une donnée
      sessionStorage.setItem('email', Email);

      // Appeler le service d'enregistrement avec l'objet complet
      this.authService.register(user).subscribe(
        response => {
          console.log('Inscription réussie', response);
          alert('Inscription réussie');
          if(UserType=="Influenceur"){
          this.router.navigate(['/authentication/register-influencer']); // Rediriger vers la page de connexion après l'inscription
        }
      else{
        this.router.navigate(['/authentication/login']); // Rediriger vers la page de connexion après l'inscription

      }
      },
        error => {
          console.error('Erreur lors de l\'inscription', error);
          alert('Erreur lors de l\'inscription');
        }
      );
    }
  }



}
