import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDashComponent } from './account-dash.component';

describe('AccountDashComponent', () => {
  let component: AccountDashComponent;
  let fixture: ComponentFixture<AccountDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
