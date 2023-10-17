import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccessMessageService {

  constructor() { }
  private successMessageSource = new BehaviorSubject<string | null>(null);
  successMessageStream = this.successMessageSource.asObservable();

  setSuccessMessage(message: string | null) {
    this.successMessageSource.next(message);
  }
}
