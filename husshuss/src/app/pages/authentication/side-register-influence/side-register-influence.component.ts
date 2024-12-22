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
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-side-register-influence',
  standalone: true,
  imports:  [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,MatSelectModule],
  templateUrl: './side-register-influence.component.html',
  styleUrl: './side-register-influence.component.scss'
})
export class SideRegisterInfluenceComponent { registerInfluenceForm: FormGroup;
  emailFromSession: string | null = null;

  constructor(
    private form: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.emailFromSession=sessionStorage.getItem('email')
    this.registerInfluenceForm = this.form.group({
      email: [sessionStorage.getItem('email'), [Validators.required, Validators.email]], // Prérempli si l'email est dans la session
      categorie: ['', [Validators.required]],
      location: ['', [Validators.required]],
      content_type: ['', [Validators.required]],
      langue: ['', [Validators.required]],
      partener_type: ['', [Validators.required]],
      compensation: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
  onSubmit() {
    if (this.registerInfluenceForm.valid) {
      // Récupérer les valeurs du formulaire
      const influenceur = this.registerInfluenceForm.value;
  
      // Ajouter l'email depuis la session à l'objet User
      influenceur.User = {
        Email: this.emailFromSession
      };
  
      // Appeler le backend pour enregistrer l'influenceur
      this.authService.inflencers(influenceur).subscribe(
        (response) => {
          console.log('Inscription réussie', response);
          alert('Inscription réussie');
          this.router.navigate(['/authentication/login']);
        },
        (error) => {
          console.error('Erreur lors de l\'inscription', error);
          alert('Une erreur est survenue lors de l\'inscription.');
        }
      );
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
  
  // onSubmit() {
  //   if (this.registerInfluenceForm.valid) {
  //     // Récupération des valeurs du formulaire
  //     const influenceur = this.registerInfluenceForm.value;

  //     // Appel au backend via AuthService
  //     this.authService.inflencers(influenceur).subscribe(
  //       (response) => {
  //         console.log('Inscription réussie', response);
  //         alert('Inscription réussie');
  //         this.router.navigate(['/authentication/login']); // Redirige vers la page de connexion
  //       },
  //       (error) => {
  //         console.error('Erreur lors de l\'inscription', error);
  //         alert('Une erreur est survenue lors de l\'inscription.');
  //       }
  //     );
  //   } else {
  //     alert('Veuillez remplir tous les champs requis.');
  //   }
  // }
}