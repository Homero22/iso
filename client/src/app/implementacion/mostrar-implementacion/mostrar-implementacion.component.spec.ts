import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarImplementacionComponent } from './mostrar-implementacion.component';

describe('MostrarImplementacionComponent', () => {
  let component: MostrarImplementacionComponent;
  let fixture: ComponentFixture<MostrarImplementacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarImplementacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MostrarImplementacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
