import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { TokenService } from '../token.service';
import { JarwisService } from '../jarwis.service';
import { ErrorMessageService } from '../error-message.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';

export const showBookResolver: ResolveFn<any> = (route, state): Observable<{}>  => {
  const router= inject( Router);
  const Token= inject( TokenService);
  const jarwis= inject(JarwisService);
  const errorMessageService= inject( ErrorMessageService);
  const token = Token.get();

  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const bookIdParam = route.paramMap.get('id');

    if (bookIdParam === null) {
      // Handle the case when 'id' is null
      return throwError('No book ID provided');
    }

    const bookId = +bookIdParam;


    return jarwis.showBook(headers, bookId).pipe(
      catchError((error: any) => {
    
       handleError(error,router,errorMessageService);
        return of('no data'); 
      
      
      })
    );

}

function handleError(
  errorResponse: HttpErrorResponse,
  router: Router,
  errorMessageService:ErrorMessageService
) { 

  
  switch (errorResponse.status) {
    case 401:
      
      router.navigateByUrl('/login');
      break;
      
    case 403:
      router.navigateByUrl('/books');
      errorMessageService.setErrorMessage(errorResponse.error.error);
      break;
   
    default:
      router.navigateByUrl('/login');
      break;
    
    }
};


