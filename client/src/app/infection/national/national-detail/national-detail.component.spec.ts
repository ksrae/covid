import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalDetailComponent } from './national-detail.component';

describe('NationalDetailComponent', () => {
  let component: NationalDetailComponent;
  let fixture: ComponentFixture<NationalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
