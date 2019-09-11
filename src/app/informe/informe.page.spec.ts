import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePage } from './informe.page';

describe('InformePage', () => {
  let component: InformePage;
  let fixture: ComponentFixture<InformePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
