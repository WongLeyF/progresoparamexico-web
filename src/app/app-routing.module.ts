import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralLayoutComponent } from './modules/shared/general-layout/general-layout.component';
import { NotAuthGuard } from './core/guards/not-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { UserRole } from './core/enums/user-role';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    component: GeneralLayoutComponent,
    children:[
      { path: '',
        loadChildren: () => import('./modules/general/home/home.module').then(m => m.HomeModule) },
  
      {
        path: 'denounce',
        loadChildren: () => import('./modules/general/denounce/denounce.module').then(m => m.DenounceModule),
        canActivate: [NotAuthGuard]
      },
      {
        path: 'about',
        loadChildren: () => import('./modules/general/about/about.module').then(m => m.AboutModule),
      }
    ]
  },
  {
    path: '',
    component: GeneralLayoutComponent,
    children:[
      { 
        path: 'login', 
        loadChildren: () => import('./modules/administrative/login/login.module').then(m => m.LoginModule),
        // canActivate: [NotAuthGuard]
      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/administrative/settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard],
        data: {roles: [UserRole.SUPER_ADMINISTRADOR]}
      },
      {
        path: 'violence',
        loadChildren: () => import('./modules/administrative/violence/violence.module').then(m => m.ViolenceModule),
        canActivate: [AuthGuard],
        data: {roles: [UserRole.SUPER_ADMINISTRADOR, UserRole.ADMINISTRADOR]}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
