import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralLayoutComponent } from './modules/shared/general-layout/general-layout.component';
import { NotAuthGuard } from './core/guards/not-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    component: GeneralLayoutComponent,
    children:[
      { path: '',
        loadChildren: () => import('./modules/general/home/home.module').then(m => m.HomeModule) },
      { 
        path: 'login', 
        loadChildren: () => import('./modules/administrative/login/login.module').then(m => m.LoginModule),
        canActivate: [NotAuthGuard]
      },
      {
        path: 'denounce',
        loadChildren: () => import('./modules/general/denounce/denounce.module').then(m => m.DenounceModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
