import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesarrolladorPage } from './desarrollador.page';

describe('DesarrolladorPage', () => {
  let component: DesarrolladorPage;
  let fixture: ComponentFixture<DesarrolladorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesarrolladorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesarrolladorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
