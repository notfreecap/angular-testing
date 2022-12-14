import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { CharizardComponent } from '../../../src/app/basic/charizard/charizard.component';
import { PokemonService } from '../../../src/app/basic/services/pokemon.service';

describe('CharizardComponent', () => {
  let component: CharizardComponent;
  let fixture: ComponentFixture<CharizardComponent>;
  let compiled: HTMLElement;
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharizardComponent ],
      providers: [
        PokemonService
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharizardComponent);
    component = fixture.componentInstance;
    
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();

    compiled = fixture.nativeElement;


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debe hacer match con el snapshot', () => {
    expect(compiled.innerHTML).toMatchSnapshot();
  });

  test('debe mostrar un loading al inicio', () => {
    const h2 = compiled.querySelector('h2');
    expect(h2?.textContent).toContain('Loading...');
  })

  test('debe cargar a charizar inmediatamente', () => {
    const dummyPokemon = {
      name: 'charizardo',
      sprites: {
        front_default: 'https://charizard.co/sprite.png'
      }
    }

    const request = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/6');
    expect(request.request.method).toBe('GET');
    request.flush(dummyPokemon);

    fixture.detectChanges();
    // console.log(compiled.innerHTML);

    const h3 = compiled.querySelector('h3');
    const img = compiled.querySelector('img');

    expect(h3?.textContent?.toUpperCase()).toContain(dummyPokemon.name.toUpperCase());
    expect(img?.src).toBe(dummyPokemon.sprites.front_default);
    expect(img?.alt).toBe(dummyPokemon.name);


  });

});
