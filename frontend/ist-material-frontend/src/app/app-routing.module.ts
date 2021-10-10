import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './components/add-item/add-item.component';
import { BoxDetailComponent } from './components/box-detail/box-detail.component';
import { BoxesListComponent } from './components/boxes-list/boxes-list.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { ItemReportComponent } from './components/item-report/item-report.component';
import { ItemFunctionalComponent } from './components/item-functional/item-functional.component';
import { ScanComponent } from './components/scan/scan.component';
import { ItemRepairAllComponent } from './components/item-repair-all/item-repair-all.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { MasterGuard } from './guards/master.guard';
import { AuthGuard } from './guards/auth.guard';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UnavailableBoxesListComponent } from './components/unavailable-boxes-list/unavailable-boxes-list.component';
import { AvailableBoxesListComponent } from './components/available-boxes-list/available-boxes-list.component';
import { BoxesBorrowedComponent } from './components/boxes-borrowed/boxes-borrowed.component';
import { ListedBoxesComponent } from './components/listed-boxes/listed-boxes.component';


const routes: Routes = [
  { path: '', component: ScanComponent},
  { path: 'boxes', component: BoxesListComponent},
  { path: 'boxes/available', component: AvailableBoxesListComponent},
  { path: 'boxes/unavailable', component: UnavailableBoxesListComponent},
  { path: 'boxes/borrowing', component: BoxesBorrowedComponent},
  { path: 'boxes/listed', component: ListedBoxesComponent},
  { path: 'boxes/:id', component:  BoxDetailComponent},
  { path: 'boxes/:id', component:  AddItemComponent},
  { path: 'items/:id', component:  DeleteItemComponent},
  { path: 'items/update/:id', component:  UpdateItemComponent},
  { path: 'items', component:  ItemsListComponent, canActivate: [MasterGuard],
  data: {guards: [AuthGuard], roles: ['ADMIN']}},
  { path: 'items/detail/:id', component: ItemDetailComponent},
  { path: 'items/report/damage/:id', component: ItemReportComponent},
  { path: 'items/repair/all/:id', component: ItemRepairAllComponent, canActivate: [MasterGuard],
    data: {guards: [AuthGuard], roles: ['ADMIN', 'USER']}},
  { path: 'items/report/:id', component: ItemFunctionalComponent},
  { path: 'login', component: LogInComponent},
  { path: 'user/details', component: UserDetailsComponent, canActivate: [MasterGuard],
    data: {guards: [AuthGuard], roles: ['ADMIN', 'USER']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
