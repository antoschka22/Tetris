import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { BoxesServiceService } from 'src/app/services/boxes-service.service';
import { ItemsService } from 'src/app/services/items.service';
import { qrCode } from 'src/global/qrCode';
import { Box } from 'src/models/box';
import { Item } from 'src/models/items';
// class for the model
class UpdateItem implements Item{
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public box_id: string | null,
    public status: string){
    }
}
@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {

  // stores the id of the item , the item itself
  itemId: string = this.activatedRoute.snapshot.params.id;
  item!: Item;
  boxes!: Box[]
  url: string = this.Qrcode.qrCodeUrl;
  itemBoxId: string = ''
  @ViewChild('f') form:any


  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemsService,
              private location: Location,
              private boxService: BoxesServiceService,
              private Qrcode: qrCode) { 
  }

  ngOnInit(): void {
    this.getItem();
    this.getBoxes();
  }

  // gets an item by the id
  getItem(){
    this.itemService.getItemById(this.itemId).subscribe((data: Item) => {
       this.item = data;
    })
  }
  getBoxes(){
    this.boxService.getAllBoxes().subscribe((data: Box[])=>{
      this.boxes = data;
    })
  }

  // go back one tab
  goBack(){
    this.location.back();
  }

  // model for the form
  model: UpdateItem | undefined;
  // creates a new model and submits it if the form is valid
  onSubmit(data: NgForm){
    // if the itemBoxId variable is empty then use the selected box id
    // if not then that means that a qr code has been scanned, so use that code
    if(this.itemBoxId === ''){
      this.model = new UpdateItem("", data.value.name, data.value.description, this.item.box_id, this.item.status);
    }else{
      this.model = new UpdateItem("", data.value.name, data.value.description, this.itemBoxId, this.item.status);
    }
    if(this.form.valid){
      this.itemService.updateItem(this.itemId, this.model).subscribe(data => {
        this.location.back();
      })
    }
  }
}