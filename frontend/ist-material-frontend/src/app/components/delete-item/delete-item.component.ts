import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss']
})
export class DeleteItemComponent implements OnInit {
  // gets the item id from the url
  itemId:number = this.activatedRoute.snapshot.params.id;

  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemsService,
              private location: Location) { }

  ngOnInit(): void {
  }
  
  //deletes an item and goes one tab back
  onDelete(){
    this.itemService.deleteItemFromBox(this.itemId, null).subscribe((data) => {
      this.location.back();
    });
  }
}
