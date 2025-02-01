import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMedicionHigieneComponent } from './plan-medicion-higiene.component';

describe('PlanMedicionHigieneComponent', () => {
  let component: PlanMedicionHigieneComponent;
  let fixture: ComponentFixture<PlanMedicionHigieneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanMedicionHigieneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanMedicionHigieneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
