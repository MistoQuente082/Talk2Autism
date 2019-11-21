import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMeninosPage } from './perfil-meninos.page';

describe('PerfilMeninosPage', () => {
  let component: PerfilMeninosPage;
  let fixture: ComponentFixture<PerfilMeninosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilMeninosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilMeninosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
