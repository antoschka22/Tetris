import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BoxesServiceService } from 'src/app/services/boxes-service.service';
import { Box } from 'src/models/box';

@Component({
  selector: 'app-listed-boxes',
  templateUrl: './listed-boxes.component.html',
  styleUrls: ['./listed-boxes.component.scss']
})
export class ListedBoxesComponent implements OnInit {

  boxes!: Box[]
  boxesLength: number = 0;
  site: string = "listed"

  constructor(private BoxesService: BoxesServiceService,
              private location: Location) { }

  ngOnInit(): void {
    this.getListedBoxes();
  }

  getListedBoxes(){
    return this.BoxesService.getListedBoxes().subscribe((data: Box[])=>{
      this.boxes = data
      this.boxesLength = this.boxes.length
    })
  }

  navigate(){
    this.location.back()
  }

} 
