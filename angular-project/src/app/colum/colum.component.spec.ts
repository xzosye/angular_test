import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumComponent } from './colum.component';

describe('ColumComponent', () => {
  let component: ColumComponent;
  let fixture: ComponentFixture<ColumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColumComponent]
    });
    fixture = TestBed.createComponent(ColumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
