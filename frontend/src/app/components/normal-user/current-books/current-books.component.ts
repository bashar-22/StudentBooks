import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
@Component({
  selector: 'app-current-books',
  templateUrl: './current-books.component.html',
  styleUrls: ['./current-books.component.css']
})
export class CurrentBooksComponent {

  public books: any[] = []; 
  errorMessage: string | null = null;
  currentPage = 1;
  totalPages = 1;
  searchTerm = ''; // Property to store the search term

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private Auth: AuthService,
    private errorMessageService:ErrorMessageService
    
   
  ) {
   
   }

  ngOnInit() {
   
    this.startShowBooks();

  }

  private startShowBooks() {
   
    // for error message
    this.errorMessageService.errorMessageStream.subscribe(message => {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = null;
        this.errorMessageService.setErrorMessage(null);
      }, 2000); // Hide the message after 2 seconds
    });

    this.getBooksData();
  }

  getBooksData()
  {

    
  const token = this.Token.get();
 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

   this.Jarwis.getMyCurrentBooks(headers,this.currentPage ,this.searchTerm).subscribe(
    (response: any) => {
      this.books = response.data;  // Assign the 'data' property to the 'books' array
      this.totalPages = response.last_page;
      this.currentPage = response.current_page;
     
    },
    (error: any) => {
      if(error.status===401)
      {
        //token is expired
        this.Auth.logout();

      }  
    }
   );
   
  }
  

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    
    this.getBooksData();
  }
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    
    //this.successMessageService.setSuccessMessage(null);
    this.getBooksData();
  }
}
searchBooks() {
  // Reset the current page when performing a new search
  this.currentPage = 1;

  this.getBooksData();
}

isReservationValid(reservationExpirationDate: Date): boolean {
  var currentDate = new Date();
  var expirDate=new Date(reservationExpirationDate);


  // if (currentDate > expirDate) {
  //   console.log('dateOne is greater than dateTwo')
  // } else {
  //   console.log(reservationExpirationDate)
  // }
  return expirDate> currentDate;
}
}
