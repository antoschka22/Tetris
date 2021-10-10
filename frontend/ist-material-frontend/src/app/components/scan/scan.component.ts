import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { BoxesServiceService } from 'src/app/services/boxes-service.service';
import { ItemsService } from 'src/app/services/items.service';
import { qrCode } from 'src/global/qrCode';
import { Box } from 'src/models/box';
import { Item } from 'src/models/items';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {

  // @ViewChild(QrScannerComponent)
  // qrScannerComponent!: QrScannerComponent;

  /**
   * sets barcode mode to qr-code only
   * variables that contain the items and boxes
   */
  allowedFormats = [ BarcodeFormat.QR_CODE];
  items: Item[] = [];
  boxes: Box[] = [];
  url =  this.codeUrl.qrCodeUrl;

  constructor(private itemService: ItemsService,
              private boxService: BoxesServiceService,
              private codeUrl: qrCode) { }

  ngOnInit(): void {
    // initializes functions
    this.getItems();
    this.getBox();
    // console.log(this.url)
  }

  /**
   * get item by id
   */
  getItems(){
    this.itemService.getItemsWithBoxName(0, 1000000).subscribe((data: Item[])=>{
      this.items = data
    })
  }

  /**
   * get box by id
   */
  getBox(){
    this.boxService.getAllBoxes().subscribe((data: Box[])=>{
      this.boxes = data
    })
  }

  /**
   * if the scanned qr-code is an item or box go there
   * else invalid qr-code
   */
  message_url: any= []
  url_check: any= []
  scanSuccessHandler(message: string){
    this.url_check = this.url.split('/')
    this.message_url = message.split('/')
    // console.log(this.message_url)
    // console.log(this.url_check)
    if(this.url_check[2] === this.message_url[2]){
      window.location.href = message
    }else{
      alert("This Qr-Code does not match to our website")
    }
  }
}
