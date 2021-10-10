import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BoxesListComponent } from './components/boxes-list/boxes-list.component';
import { BoxesListItemComponent } from './components/boxes-list-item/boxes-list-item.component';
import { BoxDetailComponent } from './components/box-detail/box-detail.component';
import { AddBoxComponent } from './components/add-box/add-box.component';
import { FormsModule } from '@angular/forms';
import { AddItemComponent } from './components/add-item/add-item.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ItemReportComponent } from './components/item-report/item-report.component';
import { ItemRepairComponent } from './components/item-repair/item-repair.component';
import { ItemFunctionalComponent } from './components/item-functional/item-functional.component';
import { ScanComponent } from './components/scan/scan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DamageModalComponent } from './components/damage-modal/damage-modal.component';
import { ItemRepairAllComponent } from './components/item-repair-all/item-repair-all.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LogInComponent } from './components/log-in/log-in.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { QrCodeModule } from 'ng-qrcode';
import { QrCodeModalComponent } from './components/qr-code-modal/qr-code-modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { AvailableBoxesListComponent } from './components/available-boxes-list/available-boxes-list.component';
import { UnavailableBoxesListComponent } from './components/unavailable-boxes-list/unavailable-boxes-list.component';
import { BoxesBorrowedComponent } from './components/boxes-borrowed/boxes-borrowed.component';
import { BoxItemListComponent } from './components/box-item-list/box-item-list.component';
import { ListedBoxesComponent } from './components/listed-boxes/listed-boxes.component';
import { ItemsListModalComponent } from './components/items-list-modal/items-list-modal.component';
import { ItemsBorrowModalComponent } from './components/items-borrow-modal/items-borrow-modal.component';
import { ItemsRestockModalComponent } from './components/items-restock-modal/items-restock-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    BoxesListComponent,
    BoxesListItemComponent,
    BoxDetailComponent,
    AddBoxComponent,
    AddItemComponent,
    DeleteItemComponent,
    UpdateItemComponent,
    NavbarComponent,
    ItemsListComponent,
    ItemDetailComponent,
    ItemReportComponent,
    ItemRepairComponent,
    ItemFunctionalComponent,
    ScanComponent,
    DamageModalComponent,
    ItemRepairAllComponent,
    LogInComponent,
    UserDetailsComponent,
    QrCodeModalComponent,
    PaginationComponent,
    AvailableBoxesListComponent,
    UnavailableBoxesListComponent,
    BoxesBorrowedComponent,
    BoxItemListComponent,
    ListedBoxesComponent,
    ItemsListModalComponent,
    ItemsBorrowModalComponent,
    ItemsRestockModalComponent,
 ],
 providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ZXingScannerModule,
    RouterModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    QrCodeModule,
    NgQrScannerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
