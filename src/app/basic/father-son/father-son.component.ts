import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from '../interfaces/client';

@Component({
  selector: 'app-father-son',
  templateUrl: './father-son.component.html',
  styleUrls: ['./father-son.component.css']
})
export class FatherSonComponent implements OnInit {

  @Input() client?: Client;
  @Output() onDeleteClient = new EventEmitter();
  @Output() onClientUpdated = new EventEmitter<Client>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(){
    this.client = undefined;
    this.onDeleteClient.emit();
  }

  onChange(id: number){
    if (!this.client) return;

    // this.client.id = newId;
    this.client = {...this.client, id};

    this.onClientUpdated.emit({ ...this.client });
  }

}
