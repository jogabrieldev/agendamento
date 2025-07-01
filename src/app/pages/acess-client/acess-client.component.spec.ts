import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessClientComponent } from './acess-client.component';

describe('AcessClientComponent', () => {
  let component: AcessClientComponent;
  let fixture: ComponentFixture<AcessClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
