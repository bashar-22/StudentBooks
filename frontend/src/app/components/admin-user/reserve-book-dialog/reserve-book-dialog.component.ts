import { HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JarwisService } from 'src/app/services/jarwis.service';

import { SuccessMessageService } from 'src/app/services/success-message.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-reserve-book-dialog',
  templateUrl: './reserve-book-dialog.component.html',
  styleUrls: ['./reserve-book-dialog.component.css']
})
export class ReserveBookDialogComponent {

  errorMessage: string | null = null;

  email: string = ''; // Bind to email input field
  reservationDate: string = ''; // Bind to reservationDate input field
  constructor(
    public dialogRef: MatDialogRef<ReserveBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: number },
   
     private successMessageService: SuccessMessageService,
    private Jarwis: JarwisService,
    private Token: TokenService,
   
  ) {
   
  
  }
  reserveBook()
  {
    const token = this.Token.get();
 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    //const formattedDate = this.datePipe.transform(this.reservationDate, 'yyyy-MM-ddTHH:mm:ssZ');
    this.Jarwis .reserveBook(headers, this.data.bookId, this.email, this.reservationDate)
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
