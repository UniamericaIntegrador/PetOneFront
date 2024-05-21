import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoreslistComponent } from './tutoreslist.component';

describe('TutoreslistComponent', () => {
  let component: TutoreslistComponent;
  let fixture: ComponentFixture<TutoreslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutoreslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutoreslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
