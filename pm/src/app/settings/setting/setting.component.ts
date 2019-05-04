import { HelperService } from '../../shared/services/helper.service';
import { Component, OnInit } from '@angular/core';
import * as Enums from '../../shared/services/enum.service';
import { Router} from '@angular/router';
import { AppService } from '../../shared/services/app.service';
import { SettingService } from '../setting.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})

export class SettingComponent implements OnInit {
  defaultUrl = Enums.commonURLs.supderAdminAPI + 'settings/';
  superAdminUrl = Enums.commonURLs.supderAdminAPI;
  taskList: any;
  tableColumns: any;
  settingList: any;
  portalList: any;
  productList: any;
  routeIds = new Array<Number>();
  formGroup: FormGroup;
  currentPage = 3;
  totalRecords: number;
  loading = true;
  rowsPerPageOptions: any = this.helperservice.config.rowsPerPageOptions;
  page = Enums.gridPaginator.defaultOrFirstPage;  //  1
  pageSize = Enums.gridPaginator.defaultPageSize;     // 25
  orderByAsc = false;
  sortColumn = 'Id';

constructor(private helperservice: HelperService , private router: Router,
private appService: AppService,
private settingService: SettingService,
private formBuilder: FormBuilder) {

  this.formGroup = this.formBuilder.group({
    Id: '',
    PortalId: '',
    ProductId: '',
    });
 }



  ngOnInit() {
    this.load();
    this.tableColumns = [
      { field: 'taskName', header: 'Task', width: 500 },
      { field: 'productName', header: 'Products', width: 85 },
      { field: 'assignToName', header: 'Assignee', width:  110  },
      { field: 'priorityName', header: 'Priority', width:  70 },
    ];
  }



  load() {
    this.grid();
    this.dropDownsList();
  }


dropDownsList() {
  this.appService.getPortalsList().subscribe(
    result => {
      this.portalList = result.data;
    });
}


  grid() {
    const autoTaskFilter: any = {
      'portId': this.getSelectedValueOf('PortalId'),
      'productId': this.getSelectedValueOf('ProductId'),
    };
    const autoTaskRequest: any = {
      'SortColumn': this.sortColumn,
      'OrderByAsc': this.orderByAsc,
      'PageNo': this.page,
      'PageSize': this.pageSize,
      'AutoTaskFilter': autoTaskFilter,
    };
    this.appService.paged('settings/paged', autoTaskRequest).subscribe(
      result => {
        this.taskList = result.result.data;
        this.totalRecords = result.result.totalRecords;
        this.loading = false;
       // this.formGroup.patchValue({  PortalId: result.requestPortalId});
      // this.onPortalChange();
     // this.productsList();
      });
  }

productsList() {
      this.settingService.onPortalChange(this.getSelectedValueOf('PortalId')).subscribe(
      result => {
        this.productList = result.data.productList;
      } );
}



  onPortalChange() {
      this.settingService.onPortalChange(this.getSelectedValueOf('PortalId')).subscribe(
      result => {
        this.productList = result.data.productList;
      } );
      this.onProductChange();
    }


    getSelectedValueOf(selected: string ) {
      return  this.formGroup.get(selected).value;
    }



    onProductChange() {
      const autoTaskFilter: any = {
        'portId': this.getSelectedValueOf('PortalId'),
        'productId': this.getSelectedValueOf('ProductId'),
      };
      const autoTaskRequest: any = {
        'SortColumn': this.sortColumn,
        'OrderByAsc': this.orderByAsc,
        'PageNo': this.page,
        'PageSize': this.pageSize,
        'AutoTaskFilter':  autoTaskFilter,
      };
      this.appService.paged('/settings/paged', autoTaskRequest).subscribe(
        result => {
          this.taskList = result.result.data;
          this.totalRecords = result.result.totalRecords;
      });
  }


  clear() {
    this.formGroup.reset();
    this.grid();
  }


  paginate(event) {
    this.page = (event.first + Number(event.rows)) / Number(event.rows);
    this.pageSize = event.rows;
    this.grid();
  }


  edit(rowData: any) {
    this.router.navigate(['../settings/edit/' + rowData.id]);
  }



  delete(rowData) {
    const id = rowData.id;
    this.helperservice.confirm(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deleteConfirmation)
    .subscribe(res => {
        if (res === true) {
          return   this.appService.delete('settings/delete/' , id).subscribe( result => {
              if (result.success === true) {

                this.load();
         this.helperservice.notify(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deletedSuccessfully);
              }
            });
        }
      });
  }


  sort(event) {
    if (event.sortField !== undefined) {
      this.sortColumn = event.sortField;
      if (event.sortOrder === Enums.orderBy.ascending) {
        this.orderByAsc = true;
        } else {
        this.orderByAsc = false;
        }
        this.grid();
      }
  }



  decideFlag(flagName: string) {
    return this.appService.checkFlag(flagName);
  }



}
