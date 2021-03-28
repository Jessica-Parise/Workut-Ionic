import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register-user',
    loadChildren: () => import('./register-user/register-user.module').then(m => m.RegisterUserPageModule)
  },
  {
    path: 'register-company',
    loadChildren: () => import('./register-company/register-company.module').then(m => m.RegisterCompanyPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tabs-company',
    loadChildren: () => import('./tabs-company/tabs-company.module').then(m => m.TabsCompanyPageModule)
  },
  {
    path: 'tabs-user',
    loadChildren: () => import('./tabs-user/tabs-user.module').then(m => m.TabsUserPageModule)
  },
  {
    path: 'tabs-admin',
    loadChildren: () => import('./tabs-admin/tabs-admin.module').then(m => m.TabsAdminPageModule)
  },
  {
    path: 'job-details',
    loadChildren: () => import('./job-details/job-details.module').then(m => m.JobDetailsPageModule)
  },
  {
    path: 'user-curriculum',
    loadChildren: () => import('./user-curriculum/user-curriculum.module').then(m => m.UserCurriculumPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
