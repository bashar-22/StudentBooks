import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBooksComponent } from './current-books.component';

describe('CurrentBooksComponent', () => {
  let component: CurrentBooksComponent;
  let fixture: ComponentFixture<CurrentBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentBooksComponent]
    });
    fixture = TestBed.createComponent(CurrentBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
