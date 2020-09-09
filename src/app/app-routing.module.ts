import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { LoginGuard } from './_guard/login.guard';
import { LogoutComponent } from './_components/logout/logout.component';
import { NotFoundComponent } from './_components/not-found/not-found.component';
import { HomeComponent } from './_components/home/home.component';
import { CategoryComponent } from './_components/category/category.component';
import { EntryComponent } from './_components/entry/entry.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'entry', component: EntryComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [LoginGuard]},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
  {path: '**', component: NotFoundComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
