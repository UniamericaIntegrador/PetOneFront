import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimentoslistComponent } from './procedimentoslist.component';

describe('ProcedimentoslistComponent', () => {
  let component: ProcedimentoslistComponent;
  let fixture: ComponentFixture<ProcedimentoslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcedimentoslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcedimentoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
