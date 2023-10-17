import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JarwisService } from './services/jarwis.service';
import { CurrentBooksComponent } from './components/normal-user/current-books/current-books.component';
import { BookHistoryComponent } from './components/admin-user/book-history/book-history.component';
import { ShowBookComponent } from './components/normal-user/show-book/show-book.component';
import { BooksComponent } from './components/normal-user/books/books.component';
import { EditBookComponent } from './components/admin-user/edit-book/edit-book.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReserveBookDialogComponent } from './components/admin-user/reserve-book-dialog/reserve-book-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReturnBookDialogComponent } from './components/admin-user/return-book-dialog/return-book-dialog.component';
import { AddBookComponent } from './components/admin-user/add-book/add-book.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    CurrentBooksComponent,
    BookHistoryComponent,
    ShowBookComponent,
    BooksComponent,
    EditBookComponent,
    ReserveBookDialogComponent,
    ReturnBookDialogComponent,
    AddBookComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [JarwisService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
