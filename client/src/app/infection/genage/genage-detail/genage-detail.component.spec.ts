import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenageDetailComponent } from './genage-detail.component';

describe('GenageDetailComponent', () => {
  let component: GenageDetailComponent;
  let fixture: ComponentFixture<GenageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
