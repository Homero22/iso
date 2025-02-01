import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeterminacionComponent } from './determinacion.component';

describe('DeterminacionComponent', () => {
  let component: DeterminacionComponent;
  let fixture: ComponentFixture<DeterminacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeterminacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeterminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
