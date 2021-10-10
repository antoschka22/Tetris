import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: string;

  constructor(private router: Router,
              private authService: AuthService,
              private listService: ListService) { 
    this.user = "";
  }

  isLogedin(){
    return this.authService.isLoggedIn()
  }

  logout(){
    window.location.reload()
    return this.authService.logoutUser()
  }
  ngOnInit(): void {
    this.user = this.authService.getUserRole();
    this.getAmountOfReports();
  }

  amountOfReports: any = []
  count: number = 0
  getAmountOfReports(){
    this.listService.getAmountOfItemsMissing().subscribe((data:number)=>{
      this.amountOfReports = data
      // console.log(this.amountOfReports['count'])
    })
  }

}
