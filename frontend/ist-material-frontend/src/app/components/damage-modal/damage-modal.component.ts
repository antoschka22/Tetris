import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/models/items';

@Component({
  selector: 'app-damage-modal',
  templateUrl: './damage-modal.component.html',
  styleUrls: ['./damage-modal.component.scss']
})
export class DamageModalComponent implements OnInit {

  // get item from the parent component 
  @Input() item: Item | undefined;

  constructor() { }

  ngOnInit(): void {
  }


}
