import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenageComponent } from './genage.component';

describe('GenageComponent', () => {
  let component: GenageComponent;
  let fixture: ComponentFixture<GenageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
