import { Component, OnInit, Input } from '@angular/core';
import { Box } from 'src/models/box';

@Component({
  selector: 'app-boxes-list-item',
  templateUrl: './boxes-list-item.component.html',
  styleUrls: ['./boxes-list-item.component.scss']
})
export class BoxesListItemComponent implements OnInit {

  // data from the parent component
  @Input() box: Box | undefined;
  @Input() boxesLength!: number;
  @Input() site: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}