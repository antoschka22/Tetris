import { Component, OnInit, Input } from '@angular/core';
import { Box } from 'src/models/box';
import { Item } from 'src/models/items';
import { user } from 'src/models/user';

@Component({
  selector: 'app-qr-code-modal',
  templateUrl: './qr-code-modal.component.html',
  styleUrls: ['./qr-code-modal.component.scss']
})
export class QrCodeModalComponent implements OnInit {

  // take the url for the qr code link
  url:string = window.location.href
  constructor() { }
  @Input() item: Item | undefined
  @Input() box: Box | undefined
  @Input() User: user | undefined
  @Input() List: string | undefined

  ngOnInit(): void {
  }  
  // print the qr code
  print(){
    window.print()
  }
}
