import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinariosdetailsComponent } from './veterinariosdetails.component';

describe('VeterinariosdetailsComponent', () => {
  let component: VeterinariosdetailsComponent;
  let fixture: ComponentFixture<VeterinariosdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinariosdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VeterinariosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
