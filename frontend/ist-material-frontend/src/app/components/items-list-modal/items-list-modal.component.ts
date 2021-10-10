import { Component, Input, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/browser';
import { BoxesServiceService } from 'src/app/services/boxes-service.service';
import { ItemsService } from 'src/app/services/items.service';
import { ListService } from 'src/app/services/list.service';
import { Box } from 'src/models/box';
import { BoxList } from 'src/models/BoxList';
import { Item } from 'src/models/items';

class itemInBox implements BoxList{
  constructor(
    public id: string,
    public box_id: string,
    public item_name: string,
    public done: string | null,
    public inbox: string | null,
    public missing: string | null,
    public item_id: string,
    public buying: string | null) {
  }
}
class itemBox implements Item{
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
@Component({
  selector: 'app-items-list-modal',
  templateUrl: './items-list-modal.component.html',
  styleUrls: ['./items-list-modal.component.scss']
})
export class ItemsListModalComponent implements OnInit {

  @Input() box!: Box
  itemsInList: BoxList[] = []
  itemInBoxModal!: itemInBox
  itemBoxModal!: itemBox
  boxModal!: boxModel
  selectItem: string = ""
  itemId: string = ""
  item!: Item

  constructor(private listService: ListService,
              private itemService: ItemsService,
              private boxService: BoxesServiceService) { }

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

  showScan: boolean = false
  showScanner(event: any, missing:any){
    if(!missing){
      this.showScan = !this.showScan
      this.selectItem = event
      // console.log(this.selectItem)
    }else{
      window.alert("This item is not in stock (its missing)")
    }
  }

  allowedFormats = [ BarcodeFormat.QR_CODE];
  test_event: string = ""
  itemIsInBox: boolean = false
  today: any = new Date();
  scanSuccessHandler(event: any){
    this.test_event = event.split('/')
    if(this.test_event[this.test_event.length-1] == this.itemId[this.itemId.length-1] || this.itemId !== ''){
      return 
    }else{
      this.itemId = event.split('/')
      // console.log(this.itemId[this.itemId.length-1])
      this.itemService.getItemById(this.itemId[this.itemId.length-1]).subscribe((data: Item)=>{
        // console.log(data)
        this.item = data
        // console.log(this.item["name"])
        if(this.checkValidationOfItem() === false){
          window.alert("Wrong item "+this.item.name)
          this.showScan = !this.showScan
          this.itemId = ''
        }else if(this.item.status !== "functional"){
          window.alert("This Item is damaged")
          this.showScan = !this.showScan
          this.itemId = ''
        }else if(this.checkValidationOfItem() === true){
          this.itemsInList.forEach((item:BoxList)=>{
            if(this.selectItem === item.item_name){
              if(item.missing === null){
                this.itemInBoxModal = new itemInBox(item.id, item.box_id, item.item_name, null, "", null, data.id, null)
              }else{
                window.alert("This item is missing")
              }
              this.itemBoxModal = new itemBox (this.item.id, this.item.name, this.item.description, this.box.id, this.item.status)
              if(this.item.box_id === null){
                this.listService.changeList(item.id, this.itemInBoxModal).subscribe((data: BoxList)=>{
                  this.itemService.updateItem(this.item.id, this.itemBoxModal).subscribe((data: Item)=>{
                    item.inbox = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
                    this.itemIsInBox = true
                    //console.log(this.itemIsInBox)
                    // console.log(data)
                  })
                })
              }else{
                window.alert("This item is already in a box")
              }
              this.showScan = !this.showScan
            }else{
              return
            }
          })
          this.itemId = ''
        }
      })
    }    
  }
  checkValidationOfItem(){
    if(this.item.name == this.selectItem){
      return true
    }else{
      return false
    }
  }
  restock(item: BoxList){
    this.itemInBoxModal = new itemInBox(item.id, item.box_id, item.item_name, null, null, "", item.item_id, null)
    this.boxModal = new boxModel(this.box.id, this.box.name, this.box.description, "unavailable", this.box.contactperson)
    this.listService.changeList(item.id, this.itemInBoxModal).subscribe((data: BoxList)=>{
      // console.log(data)
      this.boxService.changeBox(this.box.id, this.boxModal).subscribe((data: Box)=>{
        // console.log(data)
        window.location.reload();
      })
    })
  }

  newItem!: BoxList
  checkItemWithScan: boolean = false
  checkItem(item: BoxList){
    this.newItem = item
    this.checkItemWithScan = !this.checkItemWithScan
  }


  /**
   * 
   * if thats the last item with the missing true value set box usage as listed if not then just scann the item into the box 
   * 
   * 
   * 
   */
  scanCheckItem(event:any){
    if(this.newItem.missing){
      this.itemInBoxModal = new itemInBox(this.newItem.id, this.newItem.box_id, this.newItem.item_name, null, null, "inStock", this.newItem.item_id, null)
      this.boxModal = new boxModel(this.box.id, this.box.name, this.box.description, "listed", this.box.contactperson)
      this.listService.changeList(this.newItem.id, this.itemInBoxModal).subscribe((data: BoxList)=>{
        console.log(data)
        this.boxService.changeBox(this.box.id, this.boxModal).subscribe((data: Box)=>{
          // console.log(data)
          window.location.reload();
        })
      })
    }else{
      window.alert("This item is in stock");
    }
  }

  deleteList(box_id: string){
    this.box.items?.forEach((item:Item)=>{
      this.itemBoxModal = new itemBox(item.id, item.name, item.description, null, item.status)
      this.itemService.updateItem(item.id, this.itemBoxModal).subscribe()
    })
    this.boxModal = new boxModel (box_id, this.box.name, this.box.description, "available", null)
    this.listService.deleteList(box_id).subscribe(data=>{
      this.boxService.changeBox(box_id, this.boxModal).subscribe(data=>{
        window.location.reload()
      })
    })
  }
    
  borrowBox(){
    this.boxModal = new boxModel (this.box.id, this.box.name, this.box.description, "borrowed", this.box.contactperson)
    this.checkBox()
    if(this.itemsInBox){
      this.boxService.changeBox(this.box.id, this.boxModal).subscribe(data=>{
        window.location.reload()
      })
    }else if(!this.itemsInBox){
      window.alert("An item is missing")
    }
  }

  itemsInBox:boolean = true
  checkBox(){
    this.itemsInList.forEach((item:BoxList)=>{
      if(item.inbox === null){
        this.itemsInBox = false
      }else if(item.inbox !== null && this.itemsInBox === true){
        this.itemsInBox = true
      }
    })
  }

  displayLoadingAnimation: boolean = false
  checkId: string = ""
  listId: string = ""
  deleteItem(id:string){
    this.checkId = id
    this.displayLoadingAnimation = true
    if(this.itemsInList.length == 1){
      this.deleteList(this.box.id)
    }else{
      this.listService.getItemByListId(id).subscribe((data: BoxList)=>{
        console.log(data)
        this.listId = data.item_id
        if(!this.listId){
          this.listService.deleteItemInList(id).subscribe(data=>{
            setTimeout(()=>{ 
              window.location.reload()
            }, 500);
          })
        }else{
          this.itemService.getItemById(data.item_id).subscribe((dataItem:Item)=>{
            this.itemBoxModal = new itemBox (dataItem.id, dataItem.name, dataItem.description, null, dataItem.status)
            this.listService.deleteItemInList(id).subscribe(data=>{
              this.itemService.updateItem(this.listId, this.itemBoxModal).subscribe((data:Item)=>{
                setTimeout(()=>{ 
                  window.location.reload()
                }, 500);
              })
            })
          })
        }
      })
    }
  }
}