import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateQrcodeComponent } from './generate-qrcode.component';

describe('GenerateQrcodeComponent', () => {
  let component: GenerateQrcodeComponent;
  let fixture: ComponentFixture<GenerateQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateQrcodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
