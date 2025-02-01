import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoyoComponent } from './apoyo.component';

describe('ApoyoComponent', () => {
  let component: ApoyoComponent;
  let fixture: ComponentFixture<ApoyoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApoyoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApoyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
