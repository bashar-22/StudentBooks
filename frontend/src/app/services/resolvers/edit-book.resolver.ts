import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JarwisService } from '../jarwis.service';
import { Observable, catchError, of, throwError } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { error } from 'jquery';

export const editBookResolver: ResolveFn<any> = (route, state): Observable<{}>  => {
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


    return jarwis.editBook(headers, bookId).pipe(
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
