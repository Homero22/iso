import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenEjecutivoComponent } from './resumen-ejecutivo.component';

describe('ResumenEjecutivoComponent', () => {
  let component: ResumenEjecutivoComponent;
  let fixture: ComponentFixture<ResumenEjecutivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenEjecutivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenEjecutivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
