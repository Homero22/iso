import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MejoraComponent } from './mejora.component';

describe('MejoraComponent', () => {
  let component: MejoraComponent;
  let fixture: ComponentFixture<MejoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MejoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MejoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
