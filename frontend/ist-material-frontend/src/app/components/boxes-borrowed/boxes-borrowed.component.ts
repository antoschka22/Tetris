import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BoxesServiceService } from 'src/app/services/boxes-service.service';
import { Box } from 'src/models/box';

@Component({
  selector: 'app-boxes-borrowed',
  templateUrl: './boxes-borrowed.component.html',
  styleUrls: ['./boxes-borrowed.component.scss']
})
export class BoxesBorrowedComponent implements OnInit {

  boxes!: Box[]
  site: string = "borrowed"
  boxesLength: number = 0;
  constructor(private location: Location,
              private boxesService: BoxesServiceService) { }

  ngOnInit(): void {
    this.getBorrowedBoxes();
  }

  getBorrowedBoxes(){
    return this.boxesService.getBorrowedBoxes().subscribe((data: Box[])=>{
      this.boxes = data
      this.boxesLength = this.boxes.length
    })
  }

  navigate(){
    this.location.back()
  }

  newBox: boolean = false;
  addBox(){
    this.newBox = !this.newBox;
  }

}
