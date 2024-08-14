import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PseudoPageSignalsComponent } from './pseudo-page-signals.component';

describe('PseudoPageSignalsComponent', () => {
  let component: PseudoPageSignalsComponent;
  let fixture: ComponentFixture<PseudoPageSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PseudoPageSignalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PseudoPageSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
