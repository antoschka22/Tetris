import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/models/items';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  // get all the items from the parent
  @Input() allItems!: Item[]
  // send the limit pagination the user has selected to the parent
  @Output() sendAmountOfItemsShown = new EventEmitter<number>();
  // send the offset pagination
  @Output() sendOffsetPagination = new EventEmitter<number>();

  constructor(private ItemsService: ItemsService) { }

  amountItems: any = 0;
  paginationLimit: number = 5;
  pageNumber: number = 0;
  currentPage: number = 1;
  offset: number = 0;

  ngOnInit(): void {
    this.getTheAmountOfItems()
  }

  /**
   * get the amount of items stored in the db
   * calculate the amount of pages to could have in the pagination
   */
  getTheAmountOfItems(){
    this.ItemsService.getAmountOfItem().subscribe((data:number) => {
      this.amountItems = data
      this.pageNumber = Math.ceil(this.amountItems["amountofitems"] / this.paginationLimit)
      // console.log(this.pageNumber)
    })
  }

  /**
   * send the eventEmitter containing the limit of items for the pagination 
   * gets the amount of pages you can have
   * reset page and offset when selecting a new pagination limit
   */
  amountOfItems(amount:any){
    this.sendAmountOfItemsShown.emit(amount["srcElement"]["innerHTML"])
    this.paginationLimit = amount["srcElement"]["innerHTML"]
    this.pageNumber = Math.ceil(this.amountItems["amountofitems"] / this.paginationLimit)
    this.currentPage = 1
    this.offset = 0
    this.sendOffsetPagination.emit(this.offset)
    // console.log(this.paginationLimit)
    // console.log(this.pageNumber)
  }

  // go to the next page, updates the offset and sends it to the parent
  next(){
    this.currentPage += 1;
    this.offset = (this.currentPage - 1) * this.paginationLimit
    this.sendOffsetPagination.emit(this.offset)
  }
  
  // go back one page, updates the offset and sends it to the parent
  previous(){
    this.currentPage -= 1;
    this.offset = (this.currentPage - 1) * this.paginationLimit
    this.sendOffsetPagination.emit(this.offset)
  }
}
