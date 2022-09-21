import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from '../../../src/app/basic/counter/counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    compiled = fixture.nativeElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debe de hacer match con el snapshot', () => {
    expect( compiled ).toMatchSnapshot();
  });

  test('increaseBy debe incrementar basado en el argumento', () => {
    component.increaseBy(5);
    expect(component.counter).toBe(15);
  });

  test('hacer click en los botones debe sumar y restar 1', () => {
    const buttons = compiled.querySelectorAll('button');
    buttons[0].click();    
    expect(component.counter).toBe(11);

    buttons[1].click();
    buttons[1].click();
    expect(component.counter).toBe(9);
  });

  test('cambiar el counter debe actualizar la etiqueta h1', () => {
    component.increaseBy(11);
    fixture.detectChanges();
    
    const h1 = compiled.querySelector('h1');
    expect(h1?.textContent).toContain('21');
  });
});
