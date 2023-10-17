import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveBookDialogComponent } from './reserve-book-dialog.component';

describe('ReserveBookDialogComponent', () => {
  let component: ReserveBookDialogComponent;
  let fixture: ComponentFixture<ReserveBookDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveBookDialogComponent]
    });
    fixture = TestBed.createComponent(ReserveBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
