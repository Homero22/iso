import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextoComponent } from './contexto.component';

describe('ContextoComponent', () => {
  let component: ContextoComponent;
  let fixture: ComponentFixture<ContextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
