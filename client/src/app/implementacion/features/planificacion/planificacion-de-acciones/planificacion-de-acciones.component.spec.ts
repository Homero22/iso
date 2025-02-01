import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionDeAccionesComponent } from './planificacion-de-acciones.component';

describe('PlanificacionDeAccionesComponent', () => {
  let component: PlanificacionDeAccionesComponent;
  let fixture: ComponentFixture<PlanificacionDeAccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanificacionDeAccionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificacionDeAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
