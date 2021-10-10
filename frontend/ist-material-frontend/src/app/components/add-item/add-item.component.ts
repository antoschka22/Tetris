import { Component, OnInit, setTestabilityGetter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { BoxesServiceService } from 'src/app/services/boxes-service.service';
import { ItemsService } from 'src/app/services/items.service';
import { qrCode } from 'src/global/qrCode';
import { Box } from 'src/models/box';
import { Item } from 'src/models/items';

// FORM Class
class AddItem implements Item{
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public box_id: string,
    public status: string){

    }
}
class UpdateItem{
  constructor(
    public id: string,
    public box_id: string){
    }
}
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})

export class AddItemComponent implements OnInit {

  // gets box id from the url
  boxId:string = this.activatedRoute.snapshot.params.id;
  // two variables for the boxes and items that your going to fetch
  boxes!: Box[];
  items!: Item[];
  itemsWithoutReport: Item[] = [];  

  //which url your going to use either localhost:4200 or pfadfinder.at
  url: string = this.QrCode.qrCodeUrl;
  @ViewChild('f') form:any

  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemsService,
              private boxService: BoxesServiceService,
              private router: Router,
              private QrCode: qrCode) {}

  ngOnInit(): void {
    // initialize functions
    this.getBoxes();
    this.getItems();
  }

  /**
   * gets all the boxes and items
   */
  getBoxes(){
    this.boxService.getAllBoxes().subscribe((data: Box[])=>{
      this.boxes = data;
    })
  }

  // get all the items and designate a variable with the items without a damage
  getItems(){
    this.itemService.getItemsOutsideOfBox().subscribe((data: Item[]) => {
      this.items = data;
      this.items.forEach((item: Item)=>{
        if(item.status === "functional"){
          this.itemsWithoutReport.push(item)
        }else{
          // pass
        }
      })
      // console.log(this.itemsWithoutReport)
    })
  }


  // checks if your in the items list component
  isOnItemsList(): boolean{
    return this.router.url === '/items'
  } 

  /**
   * toggles the text field for inserting the item into a box 
   * (inserting an item into a box is optional) box_id is null if so
   */
  toggleBoxInput: boolean = false;
  addBox(){
    this.toggleBoxInput = !this.toggleBoxInput
  }

  // Toggles how you want to add the box (selecting || scanning qr-code)
  toggleQrCodeMode: boolean = false;
  qrCode(){
    this.toggleQrCodeMode = !this.toggleQrCodeMode
  }

  // toggles the camera for scanning the qr-code
  toggleCamera: boolean = true;
  camera(){
    this.toggleCamera = !this.toggleCamera
  }

  //which format should be used
  allowedFormats = [ BarcodeFormat.QR_CODE];

  /**
   * when the scanner scanns a qr code you iterate throughs all the boxes
   * to see if the box in the qr code exists
   * if the box in the qr code exists then you put the id of the box into the form model
   * and deactivate the camera
   */
  ScanBox(message: string){
    this.boxes.forEach((box: Box) => {
        if(message == this.url + "/boxes/" + box.id){
          // console.log(box.id)
          this.modelItems.box_id = box.id
          this.camera();
        }
    })
  }


  /**
   * scanns an item and puts it into the box your currently in
   * 
   * when the scanner scanns a qr code you iterate through all the items
   * to see if the item in the qr code exists
   * in the if you check if the item is already in that box 
   * if so you get an window.alert
   * if not then you set the boxId of the box your currently in
   * into the item
   */
  ScanItem(message: string){
    this.items.forEach((item: Item) => {
      // checks if the item is already in that box
      if(message == this.url + "/items/detail/" + item.id && item.box_id !== this.boxId){
        //changes the box id
        item.box_id = this.boxId;
        //sends the put request
        this.itemService.changeItemFromBox(item).subscribe((data: Item) =>{
          window.location.reload();
        })
      }else if(message == this.url + "/items/detail/" + item.id && item.box_id === this.boxId){
        // console.log(item)
        window.alert("This item is already in this box")
      }
    })
  }

  // The two form models for adding an item
  //depending on which site you submit the form youre going to use a different one
  model: UpdateItem = new UpdateItem("", this.boxId);
  modelItems: AddItem = new AddItem("", "", "", "", "");

  /**
   * checks from where you sent the form 
   * select the corresponding form
   */
  onSubmit(){
    //checks if you filled all the inputs
    if(this.form.valid){
      //checks from where you sent the form and if the box_id is empty
      // meaning that box_id is going to be null
      if(this.router.url === "/items" && this.modelItems.box_id === ""){
        // adds the item without a box
        this.itemService.addItemWithoutBox(this.modelItems).subscribe((createdItem: Item) => {
          window.location.reload();
          // console.log(createdItem)
        })
        // checks if your on /items and you select a box
      } else if (this.router.url === "/items"){
        // adds the item with the box_id
        this.itemService.addItemInBox(this.modelItems).subscribe((createdItem: Item)=>{
          window.location.reload();
          // console.log(createdItem)
        })
        // if your on /boxes then use this form
      }else{
        this.itemService.changeItemFromBox(this.model).subscribe((createdItem: Item)=>{
          window.location.reload();
          // console.log(createdItem)
        })
      }
    }
  }
}