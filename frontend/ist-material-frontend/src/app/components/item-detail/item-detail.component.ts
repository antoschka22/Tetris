import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';
import { qrCode } from 'src/global/qrCode';
import { ItemWithBoxName } from 'src/models/itemWithBoxName';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  /**
   * item variable, item id from the url
   */
  item!: ItemWithBoxName;
  itemId: string = this.activatedRoute.snapshot.params.id;
  error: string ="";

  // backend url to use
  url =  this.codeUrl.qrCodeUrl;

  constructor(private itemService: ItemsService,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private codeUrl: qrCode,
              private authService: AuthService) { }

  ngOnInit(): void {
    // initializes the function
    this.getItem();
  }

  isAdmin(){
    return this.authService.getUserRole() === "ADMIN"
  }
  isUser(){
    return this.authService.getUserRole() === "USER"
  }

  // gets an item by id, throws an error if couldnt fetch
  getItem(){
    this.itemService.getItemWithBoxNameById(this.itemId).subscribe((data: ItemWithBoxName)=>{
      this.item = data
      console.log(this.item)
    },
    (error) => {
      this.error = error.error;
    })
  }

  // go back one tab
  navigate(){
    this.location.back();
  }

  // toggle the alert for when items still have damages after repairing them
  display_alert = false;
  display_alertPress(){
    this.display_alert = !this.display_alert
  }

}
