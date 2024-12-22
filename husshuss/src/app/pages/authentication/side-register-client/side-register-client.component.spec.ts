import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideRegisterClientComponent } from './side-register-client.component';

describe('SideRegisterClientComponent', () => {
  let component: SideRegisterClientComponent;
  let fixture: ComponentFixture<SideRegisterClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideRegisterClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideRegisterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
