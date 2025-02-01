import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargandoPerfilComponent } from './cargando-perfil.component';

describe('CargandoPerfilComponent', () => {
  let component: CargandoPerfilComponent;
  let fixture: ComponentFixture<CargandoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargandoPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargandoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
