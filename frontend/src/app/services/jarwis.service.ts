import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient,
    private Token: TokenService) { }

  signup(data:any) {
   return this.http.post(`${this.baseUrl}/signup`, data)
    
  }

  login(data:any) {
   return this.http.post(`${this.baseUrl}/login`, data)
    //return this.http.post('url', data)
  }

  sendPasswordResetLink(data:any) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data)
  }
  
  changePassword(data:any) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)
  }
  // for normal user 

  getMyCurrentBooks(headers: HttpHeaders, page: number,search?: string)
  {
    let url = `${this.baseUrl}/my-books?page=${page}`;
  if (search) {
    url += `&search=${search}`;
  }
    return this.http.get(url, { headers })
  }
  
  showBook(headers: HttpHeaders, bookId:number)
  {
    let url = `${this.baseUrl}/books/${bookId}`;
  
    return this.http.get(url, { headers })
  }

  // for books 
  getBooks(headers: HttpHeaders, page: number,search?: string)
  {
    let url = `${this.baseUrl}/books?page=${page}`;
  if (search) {
    url += `&search=${search}`;
  }
    return this.http.get(url, { headers })
  }

  updateBook(headers: HttpHeaders, bookId: number, bookData: any) {
    const url = `${this.baseUrl}/books/${bookId}`;
    return this.http.put(url, bookData, { headers });
  }
  editBook(headers: HttpHeaders, bookId:number)
  {
    let url = `${this.baseUrl}/books/edit/${bookId}`;
  
    return this.http.get(url, { headers })
  }

  deleteBook(headers: HttpHeaders, bookId: number) {
    const url = `${this.baseUrl}/books/${bookId}`;
    return this.http.delete(url,{ headers });
  }

  reserveBook(headers: HttpHeaders, bookId: number, email: string, reservationDate: string) {
    
    const url = `${this.baseUrl}/books/reserve/${bookId}`; 
    const requestBody = { email, reservation_date: reservationDate }; 
  
    return this.http.post(url, requestBody,{headers});
  }
  returnBook(headers: HttpHeaders, bookId: number,returnDate:string) {  
    const url = `${this.baseUrl}/books/return/${bookId}`;
    const requestBody = { return_date: returnDate }; 
    return this.http.post(url,requestBody,{headers});
  }
  addBook(headers: HttpHeaders, bookData: any): Observable<any> {
    const url = `${this.baseUrl}/books`; // Adjust the endpoint if needed
    return this.http.post(url, bookData, { headers });
  }

  searchLogs(headers: HttpHeaders, page: number,email?: string, fromReturDate?:string,toReturnDate?:string)
  {
    let url = `${this.baseUrl}/logs?page=${page}`;

    if (email) {
      url += `&email=${email}`;
  }
  if (fromReturDate) {
      url += `&from_return_date=${fromReturDate}`;
  }
  if (toReturnDate) {
      url += `&to_return_date=${toReturnDate}`;
  }
  
    return this.http.get(url, { headers })
  }

}
