import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteslistComponent } from './pacienteslist.component';

describe('PacienteslistComponent', () => {
  let component: PacienteslistComponent;
  let fixture: ComponentFixture<PacienteslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacienteslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
