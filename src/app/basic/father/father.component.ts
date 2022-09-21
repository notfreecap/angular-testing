import { Component, OnInit } from '@angular/core';
import { Client } from '../interfaces/client';

@Component({
  selector: 'app-father',
  templateUrl: './father.component.html',
  styleUrls: ['./father.component.css']
})
export class FatherComponent implements OnInit {

  public client?: Client;

  constructor() { }

  ngOnInit(): void {
  }

  onSetClient(name: string){
    this.client = {id: 1, name}
  }

}
