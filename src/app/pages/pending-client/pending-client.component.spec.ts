import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingClientComponent } from './pending-client.component';

describe('PendingClientComponent', () => {
  let component: PendingClientComponent;
  let fixture: ComponentFixture<PendingClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
