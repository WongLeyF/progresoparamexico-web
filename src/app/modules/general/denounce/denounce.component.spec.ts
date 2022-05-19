import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenounceComponent } from './denounce.component';

describe('DenounceComponent', () => {
  let component: DenounceComponent;
  let fixture: ComponentFixture<DenounceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenounceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
