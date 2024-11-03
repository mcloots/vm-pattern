import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PseudoPageVmComponent } from './pseudo-page-vm.component';

describe('PseudoPageVmComponent', () => {
  let component: PseudoPageVmComponent;
  let fixture: ComponentFixture<PseudoPageVmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PseudoPageVmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PseudoPageVmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
