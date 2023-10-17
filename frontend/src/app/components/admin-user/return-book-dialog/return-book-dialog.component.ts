import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SuccessMessageService } from 'src/app/services/success-message.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-return-book-dialog',
  templateUrl: './return-book-dialog.component.html',
  styleUrls: ['./return-book-dialog.component.css']
})
export class ReturnBookDialogComponent {
  errorMessage: string | null = null;
  returnDate: string = ''; // Bind to reservationDate input field
  
  constructor(
    public dialogRef: MatDialogRef<ReturnBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: number },
   
     private successMessageService: SuccessMessageService,
    private Jarwis: JarwisService,
    private Token: TokenService
  ) {
   
  
  }
  returnBook()
  {
    const token = this.Token.get();
 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(this.returnDate);
    this.Jarwis
    .returnBook(headers, this.data.bookId, this.returnDate)
    .subscribe(
      (response:any) => {
        // Handle success
      
      const successMessage = response['message'];
    if (successMessage) {
    this.successMessageService.setSuccessMessage(successMessage);
    // set message to reload the books in case of success
    this.dialogRef.close('success');
  }
      
      },
      (error) => {
        this.errorMessage='';
          // If there are errors in the response
        if (error.error.errors) {
         
          var errorsFromServer=error.error.errors;
        
         for (var key in errorsFromServer) {
          if (errorsFromServer.hasOwnProperty(key)) {
            this.errorMessage+= errorsFromServer[key][0]+'\n';
          }
      }
        } else {
          // Handle other types of errors
          this.errorMessage = 'An error occurred.';
        }
       
      }
    );
  }

}
