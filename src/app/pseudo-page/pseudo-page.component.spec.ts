import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PseudoPageComponent } from './pseudo-page.component';

describe('PseudoPageComponent', () => {
  let component: PseudoPageComponent;
  let fixture: ComponentFixture<PseudoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PseudoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PseudoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
