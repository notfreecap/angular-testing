import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherComponent } from '../../../src/app/basic/father/father.component';
import { FatherSonComponent } from '../../../src/app/basic/father-son/father-son.component';
import { By } from '@angular/platform-browser';

describe('FatherComponent', () => {
  let component: FatherComponent;
  let fixture: ComponentFixture<FatherComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatherComponent, FatherSonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // your code here
    compiled = fixture.nativeElement;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debe hacer match con el snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  test('debe establecer el cliente con el nombre indicado', () => {
    component.onSetClient('Pedro');
    fixture.detectChanges();

    const codeDiv = compiled.querySelector('.mt-2');
    console.log(codeDiv?.textContent);

    expect(codeDiv?.textContent).toContain('"name"');
    expect(codeDiv?.textContent).toContain('"Pedro"');
  });

  test('debe borrar el cliente si se emite onDeleteClient (hijo)', () => {
    component.client = {id: 1, name: 'Groove'};
    fixture.detectChanges();


    const sonCDebugElement = fixture.debugElement.query(By.directive(FatherSonComponent));;
    const sonComponent: FatherSonComponent = sonCDebugElement.componentInstance;

    // console.log(sonComponent.client);

    sonComponent.onDeleteClient.emit();
    expect(component.client).toBe(undefined);

  });

  test('debe actualizar el cliente onClientUpdated', () => {
    component.client = {id: 1, name: 'Groove'};
    fixture.detectChanges();


    const sonCDebugElement = fixture.debugElement.query(By.directive(FatherSonComponent));;
    const sonComponent: FatherSonComponent = sonCDebugElement.componentInstance;

    // console.log(sonComponent.client);

    sonComponent.onClientUpdated.emit({id: 10, name: 'gatito'});
    expect(component.client).toEqual({id: 10, name: 'gatito'});
  });

});
