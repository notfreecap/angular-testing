import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterRouteComponent } from '../../../src/app/basic/counter-route/counter-route.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('CounterRouteComponent', () => {
  let component: CounterRouteComponent;
  let fixture: ComponentFixture<CounterRouteComponent>;

  beforeEach(async () => {

    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get(param: string){
            
            return (param === 'initial') ? '100' : undefined;
          }
        }
      }
    }


    await TestBed.configureTestingModule({
      declarations: [ CounterRouteComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // your code here
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debe tener el valor inicial en cero', () => {
    expect(component.counter).toBe(100);
  });

  test('debe tener el valor inicial de 100 en la ruta', () => {
    expect(component.counter).toBe(100);
  });
});
