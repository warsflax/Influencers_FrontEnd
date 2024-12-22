import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';
import { SideRegisterClientComponent } from './side-register-client/side-register-client.component';
import { SideRegisterInfluenceComponent } from './side-register-influence/side-register-influence.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
      {
        path: 'register-client',
        component: SideRegisterClientComponent,
      },
      {
        path: 'register-influencer',
        component: SideRegisterInfluenceComponent,
      },
    ],
  },
];
