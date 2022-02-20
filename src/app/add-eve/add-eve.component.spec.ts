import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEveComponent } from './add-eve.component';

describe('AddEveComponent', () => {
  let component: AddEveComponent;
  let fixture: ComponentFixture<AddEveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
