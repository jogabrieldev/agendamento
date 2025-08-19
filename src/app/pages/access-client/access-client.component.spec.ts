import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessClientComponent } from './access-client.component';

describe('AccessClientComponent', () => {
  let component: AccessClientComponent;
  let fixture: ComponentFixture<AccessClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
