import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimentosdetailsComponent } from './procedimentosdetails.component';

describe('ProcedimentosdetailsComponent', () => {
  let component: ProcedimentosdetailsComponent;
  let fixture: ComponentFixture<ProcedimentosdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcedimentosdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcedimentosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
