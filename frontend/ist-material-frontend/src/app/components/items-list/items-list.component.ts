import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';
import { ItemWithBoxName } from 'src/models/itemWithBoxName';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {


  @Input() data: any

  // stores all the items
  items: ItemWithBoxName[] = [];
  // limit and offset for the pagination
  itemLimit: number = 5;
  offset: number = 0;

  constructor(private itemService: ItemsService,
              private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    //initializes functions
    this.getItemsWithBoxInfo();
  }

  // functions to check if your a user or admin
  isAdmin() {
    return this.authService.getUserRole() == 'ADMIN';
  }
  isUser(){
    return this.authService.getUserRole() == 'USER';
  }
  /**
   * gets all the items
   */
  getItemsWithBoxInfo(){
    this.itemService.getItemsWithBoxName(this.offset, this.itemLimit).subscribe((data: ItemWithBoxName[]) => {
      this.items = data
      // console.log(this.items);
    })
  }

  // toggle component
  display = false;
  onPress() {
    this.display = !this.display;
  }

  // alert for reporting an item that has already been reported
  warnReport(id: string){
    if(window.confirm("This item has already been reported. Do you want to report the item again?")){
      this.router.navigate(['/items/report/damage/' + id]);
    }
  }
  
  // displays the alert of an item beeing repaired but still has damages
  display_alert = false;
  display_alertPress(){
    this.display_alert = !this.display_alert
  }

  /**
   * get the limit pagination of items from child component 
   * call the Items function so you can see the results 
   */
  itemsShown(amountOfItemsShown:number){
    this.itemLimit = amountOfItemsShown
    this.getItemsWithBoxInfo()
  }

  /**
   * get the offset from the child component 
   * call the Items function so you can see the results
   */
  offsetAmount(offset: number){
    this.offset = offset;
    // console.log(this.offset)
    this.getItemsWithBoxInfo()
  }
}