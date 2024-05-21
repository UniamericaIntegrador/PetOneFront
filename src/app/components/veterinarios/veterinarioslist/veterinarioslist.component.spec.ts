import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioslistComponent } from './veterinarioslist.component';

describe('VeterinarioslistComponent', () => {
  let component: VeterinarioslistComponent;
  let fixture: ComponentFixture<VeterinarioslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinarioslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VeterinarioslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
