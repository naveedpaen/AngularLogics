import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../shared/services/helper.service';
import * as Enums from '../../shared/services/enum.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  tableColumns: any ;
  totalRecords: number;
  rowsPerPageOptions: any = this.helperService.config.rowsPerPageOptions;
  currentPage = Enums.gridPaginator.defaultOrFirstPage;
  userList: any;
  pageNumber  = Enums.gridPaginator.defaultOrFirstPage;  //  1
  pageSize    = Enums.gridPaginator.defaultPageSize;     // 25
  constructor( private helperService: HelperService) { }
  ngOnInit() {

    this.tableColumns = [
      { field: 'firstname', header: 'First Name' },
      { field: 'surName', header: 'SurName' },
      { field: 'email', header: 'Email/UserName' },
      { field: 'password', header: 'Password' },
      { field: 'country', header: 'Country' },
  ];

  }
  showDialog(number, rowData: any) {

  }
  DeleteRecord(rowData: any) {

  }

  paginate(event: any) {}

}
