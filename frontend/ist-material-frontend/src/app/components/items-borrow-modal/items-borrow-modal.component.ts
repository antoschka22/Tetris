import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/browser';
import { BoxesServiceService } from 'src/app/services/boxes-service.service';
import { ItemsService } from 'src/app/services/items.service';
import { ListService } from 'src/app/services/list.service';
import { ReportService } from 'src/app/services/report.service';
import { Box } from 'src/models/box';
import { BoxList } from 'src/models/BoxList';
import { Item } from 'src/models/items';
import { Report } from 'src/models/report';

class reportModel implements Report{
  constructor(
    public id: string,
    public item_id: string,
    public description: string,
    public repaired: string,
    public repairing: string){

    }
}
class itemModel implements Item{
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public box_id: string | null,
    public status: string){
    }
}
class boxModel implements Box{
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public usage: string,
    public contactperson: string | null){
    }
}
class listModel implements BoxList{
  constructor(
    public id: string,
    public box_id: string,
    public item_name: string,
    public done: string | null,
    public inbox: string | null,
    public missing: string | null,
    public item_id: string,
    public buying: string | null){
  }
}
@Component({
  selector: 'app-items-borrow-modal',
  templateUrl: './items-borrow-modal.component.html',
  styleUrls: ['./items-borrow-modal.component.scss']
})
export class ItemsBorrowModalComponent implements OnInit {

  constructor(private listService: ListService,
              private itemService: ItemsService,
              private reportService: ReportService,
              private boxService: BoxesServiceService) { }

  @Input() box!: Box
  itemsInList!: BoxList[]
  itemId: string = ""
  test_event: string = ""

  ngOnInit(): void {
    setTimeout(()=>{ 
      this.getItemsInList();
    }, 600);
  }

  getItemsInList(){
    setTimeout(()=>{ 
      this.listService.getItemsOfListByBoxId(this.box.id).subscribe((data: BoxList[])=>{
        this.itemsInList = data
        // console.log(data)
      })
    }, 600);
  }

  showScan: boolean = false;
  showScanner(){
    this.showScan = !this.showScan
    this.damageForm = false
  }

  allowedFormats = [ BarcodeFormat.QR_CODE];
  damageForm: boolean = false
  selectedItem: string = ""
  itemLength: number = 0
  checkLength: number = 0
  item!: Item
  scanSuccessHandler(event:any){
    this.test_event = event.split('/')
    if(this.test_event[this.test_event.length-1] == this.itemId[this.itemId.length-1] || this.itemId !== ''){
      return 
    }else{
      this.itemLength = this.itemsInList.length
      this.itemId = event.split('/')
      this.itemService.getItemById(this.itemId[this.itemId.length-1]).subscribe((data: Item)=>{
        this.item = data
        this.itemsInList.forEach((item:BoxList)=>{
          if(item.item_name == data.name){
            this.model = new reportModel("", this.item.id, "", "", "")
            this.selectedItem = item.item_name
            this.damageForm = true
            this.showScan = false
          }else if(this.checkLength === this.itemLength){
            window.alert("Item doesnt exist in this list")
            this.checkLength = 0
          }else{
            this.checkLength += 1
            return
          }
        })
        this.itemId = ''
      })
    }
  }

  model!: reportModel
  itemModel!: itemModel
  listModel!: listModel
  onSubmit(){
    this.itemModel = new itemModel("", this.item.name, this.item.description, this.item.box_id, "damage")
    this.reportService.addReportItem(this.model).subscribe((data:Report)=>{
      this.itemService.updateItem(this.item.id, this.itemModel).subscribe((data:Item)=>{
        window.location.reload()
      })
    })
  }

  boxModel!: boxModel
  displayLoadingAnimation: boolean = false
  bringBack(){
    this.displayLoadingAnimation = !this.displayLoadingAnimation
    this.boxModel = new boxModel (this.box.id, this.box.name, this.box.description, "available", null)
    this.boxService.changeBox(this.box.id, this.boxModel).subscribe(data=>{
      this.itemsInList.forEach((item: BoxList)=>{
        this.listModel = new listModel (item.id, item.box_id, item.item_name, "", null, item.missing, item.item_id, null)
        this.listService.changeList(item.id, this.listModel).subscribe(data=>{
          this.itemService.getItemByItemNameAndBoxId(item.item_name, this.box.id).subscribe((data:Item)=>{
            this.itemModel = new itemModel ("", item.item_name, data.description, null, data.status)
            this.itemService.updateItem(data.id, this.itemModel).subscribe()
          })
        })
      })
    })
    setTimeout(()=>{ 
      window.location.reload()
    }, 2000);
  }
}
