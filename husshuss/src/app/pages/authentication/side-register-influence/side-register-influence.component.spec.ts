import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideRegisterInfluenceComponent } from './side-register-influence.component';

describe('SideRegisterInfluenceComponent', () => {
  let component: SideRegisterInfluenceComponent;
  let fixture: ComponentFixture<SideRegisterInfluenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideRegisterInfluenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideRegisterInfluenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
