import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CurrentBooksComponent } from './components/normal-user/current-books/current-books.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { BookHistoryComponent } from './components/admin-user/book-history/book-history.component';
import { ShowBookComponent } from './components/normal-user/show-book/show-book.component';
import { editBookResolver } from './services/resolvers/edit-book.resolver';
import { BooksComponent } from './components/normal-user/books/books.component';
import { EditBookComponent } from './components/admin-user/edit-book/edit-book.component';
import { showBookResolver } from './services/resolvers/show-book.resolver';
import { AddBookComponent } from './components/admin-user/add-book/add-book.component';


const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService]
    
   
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AfterLoginService]

  },
  {
    path: 'my-current-books',
    component: CurrentBooksComponent,
    canActivate: [AfterLoginService]
    
  },

  {
    path: 'request-password-reset',
    component: RequestResetComponent,
    canActivate: [BeforeLoginService]
   
  },
  {
    path: 'response-password-reset',
    component: ResponseResetComponent,
    canActivate: [BeforeLoginService]

  },

  { path: 'show-book/:id', 
 component: ShowBookComponent,
 canActivate:[AfterLoginService],
 resolve: {
  showBookResolver: showBookResolver
},

},
{
  path:'books',
  component:BooksComponent,
  canActivate:[AfterLoginService],
  
  
},
{ path: 'edit-book/:id', 
component: EditBookComponent,
canActivate:[AfterLoginService],
resolve: {
 editBookResolver: editBookResolver
},

},

{ path: 'add-book', 
component: AddBookComponent,
canActivate:[AfterLoginService]
},

{ path: 'search-logs', 
component: BookHistoryComponent,
canActivate:[AfterLoginService]
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
