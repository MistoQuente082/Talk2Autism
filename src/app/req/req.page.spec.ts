import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqPage } from './req.page';

describe('ReqPage', () => {
  let component: ReqPage;
  let fixture: ComponentFixture<ReqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
