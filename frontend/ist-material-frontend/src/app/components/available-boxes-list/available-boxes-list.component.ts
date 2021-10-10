import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BoxesServiceService } from 'src/app/services/boxes-service.service';
import { Box } from 'src/models/box';

@Component({
  selector: 'app-available-boxes-list',
  templateUrl: './available-boxes-list.component.html',
  styleUrls: ['./available-boxes-list.component.scss']
})
export class AvailableBoxesListComponent implements OnInit {

  boxes!: Box[]
  boxesLength: number = 0;
  site: string = "available"

  constructor(private BoxesService: BoxesServiceService,
              private location: Location) { }

  ngOnInit(): void {
    this.getAvailableBoxes();
  }

  getAvailableBoxes(){
    return this.BoxesService.getAvailableBoxes().subscribe((data: Box[])=>{
      this.boxes = data
      this.boxesLength = this.boxes.length
    })
  }

  newBox: boolean= false
  addBox(){
    this.newBox = !this.newBox
  }

  navigate(){
    this.location.back()
  }

}
