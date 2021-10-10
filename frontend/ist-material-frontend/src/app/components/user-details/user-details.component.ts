import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ListService } from 'src/app/services/list.service';
import { UserService } from 'src/app/services/user.service';
import { BoxList } from 'src/models/BoxList';
import { user } from 'src/models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(private authService: AuthService,
              private userService: UserService,
              private listService: ListService) { }

  userInformation!: user
  itemsNotOnStock: BoxList[] = []

  ngOnInit(): void {
    this.getUserInformation();
    this.getItemsNeedStock();
  }

  // Get the user id, via decoding the token and returning the id
  userId(){
    return this.authService.getIdFromToken()
  }

  // get the user information
  getUserInformation(){
    this.userService.getUserById(this.userId()).subscribe((information: user)=>{
      // console.log(information)
      this.userInformation = information
    })
  }

  getItemsNeedStock(){
    this.listService.getItemsNotStock().subscribe((data:BoxList[])=>{
      this.itemsNotOnStock = data
    })
  }
}
