import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvMensagemPage } from './env-mensagem.page';

describe('EnvMensagemPage', () => {
  let component: EnvMensagemPage;
  let fixture: ComponentFixture<EnvMensagemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvMensagemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvMensagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
