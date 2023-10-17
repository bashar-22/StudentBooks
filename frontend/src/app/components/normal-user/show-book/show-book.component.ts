import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent {

  bookId: number=0;
  book:any={};
 

  constructor(private route: ActivatedRoute, 
    private http: HttpClient,
    private Token: TokenService,
    private jarwis: JarwisService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.bookId = params['id'];
        this.loadBookDetails();
      });
    }

    loadBookDetails()
  {
    this.activatedRoute.data.subscribe(data => {
     this.book=data['showBookResolver'];
     
    })
  }
  
    goBack(): void {
      this.location.back();
    }

    isReservationValid(reservationExpirationDate: Date): boolean {
      var currentDate = new Date();
      var expirDate=new Date(reservationExpirationDate);
  
      return expirDate> currentDate;
    }

}
