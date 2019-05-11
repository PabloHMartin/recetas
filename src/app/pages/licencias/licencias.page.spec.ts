import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenciasPage } from './licencias.page';

describe('LicenciasPage', () => {
  let component: LicenciasPage;
  let fixture: ComponentFixture<LicenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenciasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
