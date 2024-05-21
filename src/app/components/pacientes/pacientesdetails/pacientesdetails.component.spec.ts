import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesdetailsComponent } from './pacientesdetails.component';

describe('PacientesdetailsComponent', () => {
  let component: PacientesdetailsComponent;
  let fixture: ComponentFixture<PacientesdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacientesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
