import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoresdetailsComponent } from './tutoresdetails.component';

describe('TutoresdetailsComponent', () => {
  let component: TutoresdetailsComponent;
  let fixture: ComponentFixture<TutoresdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutoresdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutoresdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
