import { createPlatform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherSonComponent } from '../../../src/app/basic/father-son/father-son.component';

describe('FatherSonComponent', () => {
  let component: FatherSonComponent;
  let fixture: ComponentFixture<FatherSonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatherSonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FatherSonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // your code here
    compiled = fixture.nativeElement;
    // clar all mocks
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debe de hacer match con el snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  test('no deben aparecer bonotes', () => {
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(0);
  });

  test('deben aparecer bonotes si hay cliente', () => {
    component.client = {id: 1, name: 'ghost'};
    fixture.detectChanges();

    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

  test('debe emitir onDeleteClient con el boton eliminar', () => {
    component.client = {id: 1, name: 'ghost'};
    fixture.detectChanges();

    jest.spyOn(component.onDeleteClient, 'emit');

    const btnDelete = compiled.querySelector('[data-test=btn-delete]');
    // console.log(btnDelete?.textContent);
    btnDelete?.dispatchEvent(new Event('click'));

    expect(component.onDeleteClient.emit).toHaveBeenCalled();
  });

  test('debe emitir onClientUpdated con el boton "Cambiar ID"', () => {
    component.client = {id: 1, name: 'ghost'};
    fixture.detectChanges();

    jest.spyOn(component.onClientUpdated, 'emit');

    const btnChangeId = compiled.querySelector('[data-test=btn-change-id]');
    // console.log(btnDelete?.textContent);
    btnChangeId?.dispatchEvent(new Event('click'));

    expect(component.onClientUpdated.emit).toHaveBeenCalledWith({
      id: 5,
      name: 'ghost'
    });
  });

  test('debe emitir onChangeClient con el ID especificado si hay un cliente', () => {
    jest.spyOn(component.onClientUpdated, 'emit');

    component.onChange(10);
    expect(component.onClientUpdated.emit).not.toHaveBeenCalled();

    component.client = {id: 1, name: 'ghost'};
    fixture.detectChanges();
    component.onChange(10);
    expect(component.onClientUpdated.emit).toHaveBeenCalledWith({
      id: 10,
      name: 'ghost'
    });

  });

});
