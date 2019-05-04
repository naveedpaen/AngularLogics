import { HelperService } from '../../shared/services/helper.service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AppService } from './../../shared/services/app.service';
import { FormBuilder, FormControl, FormGroup, Form } from '@angular/forms';
import * as Enums from '../../shared/services/enum.service';
import { Router } from '@angular/router';
import { ProjectService } from '../projects.service';

export class Paginator {
  pageNumber: number;
  page: number;
  pageSize: any;
  orderByAsc: boolean;
  sortColumn: string;
  dateFrom: Date;
  dateTo: Date;
  currentPage;

  constructor() {
    this.pageNumber = Enums.gridPaginator.defaultOrFirstPage;
    this.page = Enums.gridPaginator.defaultOrFirstPage;
    this.pageSize = Enums.gridPaginator.defaultPageSize;
    this.orderByAsc = false;
    this.sortColumn = 'dT_Created';
    this.dateFrom = new Date(new Date().getMonth());
    this.dateTo = new Date();
    this.currentPage = 1;
  }
}


@Component({
  selector: 'app-allprojects',
  templateUrl: './allprojects.component.html',
  styleUrls: ['./allprojects.component.css']
})


export class AllprojectsComponent implements OnInit {
  defaultUrl = Enums.commonURLs.supderAdminAPI + 'project/';
  tableColumns: any;
  allProjectsList: any;
  paginator: Paginator;
  formGroup: FormGroup;
  form: Form;

  currentPage = 3;
  totalRecords: number;
  loading = true;
  rowsPerPageOptions: any = this.helperService.config.rowsPerPageOptions;
  page = Enums.gridPaginator.defaultOrFirstPage;  //  1
  pageSize = Enums.gridPaginator.defaultPageSize;     // 25
  orderByAsc = false;
  sortColumn = 'Id';

  portalList: any;
  projectList: any;
  accountantList: any;
  constructor(
    private router: Router,
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private porjectService: ProjectService
  ) {
    this.tableColumns = [
      { field: 'name', header: 'Project Name', width: '400' },
      { field: 'accountManager', header: 'Account Manager', width: '90' },
      { field: 'startDate', header: 'Created', width: 70 },
    ];

    this.paginator = new Paginator();



    this.formGroup = formBuilder.group({
      portalId: '',
      projectId: { value: '', disabled: true },
      accountantId: { value: '', disabled: true },
    });
  }



  ngOnInit() {
    this.load();
  }


  load() {
    const url = this.defaultUrl + 'paged';
    this.helperService.post(url, this.setFilters()).subscribe(
      result => {
        this.loading = false;
        this.allProjectsList = result.result.data.data;
        this.totalRecords = result.result.data.totalRecords;
      },
      error => { }
    );

    // .....  Portal List DropDown
    this.appService.getPortalsList().subscribe(result => {
      this.portalList = result.data;
    });
  }


  onPortalChange() {
    this.formGroup.get('projectId').enable();
    this.formGroup.get('accountantId').enable();
    this.porjectService.OnPortalChange(this.getSelectedValueOf('portalId')).subscribe(result => {
      this.accountantList = result.accountants;
      this.projectList = result.projects;
    });
  }

  search() {
    const ProjectFilter: any = {
      'PortalId': this.getSelectedValueOf('portalId'),
      'ProjectId': this.getSelectedValueOf('projectId'),
      'AccountantId': this.getSelectedValueOf('accountantId'),
    };
    const pageRequest: any = {
      'SortColumn': this.sortColumn,
      'OrderByAsc': this.orderByAsc,
      'PageNo': this.page,
      'PageSize': this.pageSize,
      'ProjectFilter': ProjectFilter,
    };
    this.appService.paged('project/paged', pageRequest).subscribe(result => {
      this.allProjectsList = result.result.data.data;
      this.totalRecords = result.result.data.totalRecords;
    });
  }



  onAccountantChange() {
    this.porjectService.onAccountantChange(this.getSelectedValueOf('accountantId')).subscribe(result => {
      this.projectList = result.data.projectList;
    });
  }


  getSelectedValueOf(selectedId: string) {
    return this.formGroup.get(selectedId).value;
  }


  clear() {
    this.formGroup.reset();
    this.load();
  }

  setFilters() {
    return {
      'SortColumn': this.sortColumn,
      'OrderByAsc': this.orderByAsc,
      'PageNo': this.page,
      'PageSize': this.pageSize,
    };
  }

  paginate(event) {
    this.page = (event.first + Number(event.rows)) / Number(event.rows);
    this.pageSize = event.rows;
    this.load();
  }


  edit(rowData: any) {
    this.router.navigate(['../projects/edit/' + rowData.id]);
  }

  detail(rowData) {
    this.router.navigate(['../projects/detail/' + rowData.id]);
  }


  delete(rowData) {
    const id = rowData.id;
    this.helperService.confirm(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deleteConfirmation)
      .subscribe(res => {
        if (res === true) {
          return this.appService.delete('project/delete/', id).subscribe(result => {
            if (result.success === true) {
              this.helperService.notify(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deletedSuccessfully);
              this.load();
            }
          });
        }
      });
  }



  decideStatus(status: string) {
    return this.appService.checkStatus(status);
  }

  decideFlag(portalId: Number) {
    return this.appService.decideFlag(portalId);
  }


}
