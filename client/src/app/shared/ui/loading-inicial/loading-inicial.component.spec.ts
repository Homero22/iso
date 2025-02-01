import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingInicialComponent } from './loading-inicial.component';

describe('LoadingInicialComponent', () => {
  let component: LoadingInicialComponent;
  let fixture: ComponentFixture<LoadingInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingInicialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
