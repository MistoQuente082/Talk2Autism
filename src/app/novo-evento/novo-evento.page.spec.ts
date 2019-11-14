import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoEventoPage } from './novo-evento.page';

describe('NovoEventoPage', () => {
  let component: NovoEventoPage;
  let fixture: ComponentFixture<NovoEventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoEventoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
