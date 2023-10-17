import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() { 

  }
  private errorMessageSource = new BehaviorSubject<string | null>(null);
  errorMessageStream = this.errorMessageSource.asObservable();

  setErrorMessage(message: string | null) {
    this.errorMessageSource.next(message);
  }
}
