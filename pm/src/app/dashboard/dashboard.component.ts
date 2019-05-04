import { AppService } from '../shared/services/app.service';
import { Component, OnInit } from '@angular/core';
import * as Enums from '../shared/services/enum.service';
import { HelperService } from '../shared/services/helper.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


class TaskItems {
  Id: number;
  TaskId: number;
  Name: string;
  IsCompleted: number;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  defaultUrl = Enums.commonURLs.supderAdminAPI + 'dashboard/';
  manualTaskURL = Enums.commonURLs.supderAdminAPI + 'tasks/';
  activityUrl = Enums.commonURLs.supderAdminAPI + 'activity/';
    attachmentUrl = Enums.commonURLs.supderAdminAPI + 'attachments/';


  pageNumber = Enums.gridPaginator.defaultOrFirstPage; //  1
  pageSize = 7; // 25
  orderByAsc = false;
  sortColumn = 'Id';
  tableColumns: any;
  taskList: any;
  rowsPerPageOptions: any = this.helperService.config.rowsPerPageOptions;
  currentPage = Enums.gridPaginator.defaultOrFirstPage;
  totalRecords: number;
  busySearching = false;
  loading = true;
  portalList: any;
  logedInUser: string;

  totalProjects: number;
  openProjects: number;
  openTasks: number;
  totalClients: number;
  myarray: number[];
  activityList: any;

  showLoader: boolean;
  color = 'warn';


  showTaskItemPopUp = false;
  taskNameOnPopupHeader: string;

  taskIdOfParentComponent: number;
  showDetailComponent = false;

 //
 //#region Variables

 projectList: number;
 accountantList: any;
 assignedList: any;
 priorityList: any;
 statusList: any;
 productList: any;
 formGroup: FormGroup;
 selectedCar1: any;
 showPopUp = false;
 attachmentList: any;
 statusShow = true;
 hideDiv = 'Hidden';

 // commments
 CommentUrl = Enums.commonURLs.supderAdminAPI + 'issuecomment/';
 projectCommentURL = Enums.commonURLs.supderAdminAPI + 'project/';
 parentComment: string;
 childComment = '';
 ParentId = 0;
 CommentList: any;
 mytaskId: number;

 // Detail
 taskId: number;
 name: string;
 accountantName: string;
 assignedtoName: string;
 priorityName: string;
 productName: string;
 projectName: string;
 statusName: string;
 targetDate: string;
 startDate: string;
 portalName: string;
 description: string;
 statusListDD: any;


 StatusText: string;
 all2 = true;
 myModel: boolean;
 completedOrNor: boolean;
 DonotShowOneTask = true;
 dependencyTableList: any;

 parentName: string;
 taskLinkCss: string;

 // task item
   taskItemCols: any;
   taskItemList: any;
   isCompleted: string;
   taskItemName: string;
   showIsCompleted: boolean;
   ItemId: number;
   TimeTaken: string;
   showHoursPopUp = false;

  constructor(
    private router: Router,
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    private appService: AppService
  ) {
    this.statusListDD =  this.appService.StatusList();
  }

  ngOnInit() {
    this.showLoader = true;
    this.getActivities();
    this.load();
    this.grid();



    this.tableColumns = [
      { field: 'name', header: 'Description', width: 400, },
      { field: 'statusName', header: 'Status', width: 70 },
      { field: 'startDate', header: 'Created', width: 70 },
    ];

    this.taskItemCols = [
      { field: 'name', header: 'Name', width: 550 },
      { field: 'isCompleted', header: 'isComplete' },
    ];


    // this.statusListDD = [
    //   { id: 1, name: 'ToDo' },
    //   { id: 2, name: 'InProgress' },
    //   { id: 3, name: 'Delay' },
    //   { id: 4, name: 'Completed' },
    // ];

  }




  grid() {
    const ManualTasksFilter: any = {
      'portalId': '',
      'projectId': '',
      'productId': '',
    };
    const pageRequest: any = {
      'SortColumn': this.sortColumn,
      'OrderByAsc': this.orderByAsc,
      'PageNo': this.pageNumber,
      'PageSize': this.pageSize,
      'ManualTasksFilter': ManualTasksFilter,
    };
    this.helperService.post(this.manualTaskURL + 'mytaskspaged', pageRequest).subscribe(result => {
      this.loading = false;
      this.showLoader = false;
      this.logedInUser = result.logedInUser;
      this.taskList = result.data.data;
      this.totalRecords = result.data.totalRecords;
    });
  }





  load() {
    this.helperService.get(this.defaultUrl + 'all').subscribe(result => {
      this.totalProjects = result.data[0].totals;
      this.openProjects = result.data[1].totals;
      this.openTasks = result.data[2].totals;
      this.totalClients = result.data[3].totals;
    });
  }



  splitSummary(summaryText: string): Array<string> {
    return summaryText.split(',');
  }

  getActivities() {
    const url = `${this.activityUrl}all?id=0&recordType=Project`;
    this.helperService.get(url).subscribe(result => {
      this.activityList = result.data;
    });
  }


// new
onRowSelect(event) {
  if (event.data.id > 0 ) {
    this.showPopUp = true;
    this.taskId = event.data.id;
    this.ParentId = event.data.parentId;


  this.name = event.data.name;
  this.accountantName = event.data.accountantName;
  this.assignedtoName = event.data.assignedtoName;
  this.priorityName = event.data.priorityName;
  this.productName = event.data.productName;
  this.projectName = event.data.projectName;
  this.statusName = event.data.statusName;
  this.targetDate = event.data.targetDate;
  this.startDate = event.data.startDate;
  this.portalName = event.data.portalName;
  this.description = event.data.description;

  if (event.data.parentName !== null) {
    this.parentName = event.data.parentName;
    this.decideDependentLinkCSS(this.parentName);
  } else {
    this.parentName = 'No Task';
    this.decideDependentLinkCSS('null');
  }

  if (event.data.parentName !== null) {
    this.parentName = event.data.parentName;
  } else {
    this.parentName = 'No Task';
  }

  this.getRelatedTask(this.taskId);
  this.getTaskItems();
  this.getAttachmentsById(this.taskId);
  this.getComments();
  // this.appService.getRelatedTasks(this.taskId).subscribe (result => {
  //   this.dependencyTableList = result.data;
  //   if (Object.keys(this.dependencyTableList).length > 1 ) {
  //     this.DonotShowOneTask = true ;
  //   } else {
  //     this.DonotShowOneTask = false;
  //   }
  //  });

  // this.helperService.get(this.attachmentUrl + 'all?id=' + this.taskId + '&recordType=' +
  //   Enums.RecordType.ManualTask).subscribe(result => {
  //     this.attachmentList = result.data;
  //   });
  }
}


// onRowSelect2() {
//   this.helperService.get(this.defaultUrltasks  + 'task/' + this.taskId).subscribe( result => {
//     const data  =  result.data.getTaskByIdViewModel[0];
//     this.name = data.name;
//     this.accountantName = data.name;
//     this.assignedtoName = data.supportUser;
//     this.priorityName = data.priority;
//     this.productName = data.product;
//     this.projectName = data.project;
//     this.statusName = data.status;
//     this.targetDate = data.targetDate;
//     this.startDate = data.startDate;
//     this.portalName = data.portal;
//     this.description = data.description;
//   });

//   this.getComments();
//   this.helperService.get(this.attachmentUrl + 'all?id=' + this.taskId + '&recordType=' +
//     Enums.RecordType.ManualTask).subscribe(result => {
//       this.attachmentList = result.data;
//     });
//  }



 onRowSelect2() {
  this.taskId = this.ParentId;
  this.helperService.get(this.manualTaskURL  + 'task/' + this.taskId).subscribe( result => {
    const data  =  result.data.getTaskByIdViewModel[0];
    this.name = data.name;
    this.accountantName = data.name;
    this.assignedtoName = data.supportUser;
    this.priorityName = data.priority;
    this.productName = data.product;
    this.projectName = data.project;
    this.statusName = data.status;
    this.targetDate = data.targetDate;
    this.startDate = data.startDate;
    this.portalName = data.portal;
    this.description = data.description;
    if (data.parentName === null) {
      this.parentName = 'No Task' ;
      this.decideDependentLinkCSS('null');
    } else {
      this.parentName = data.parentName;
      this.decideDependentLinkCSS(this.parentName);
    }
    this.ParentId = data.parentId;
  });


  this.getRelatedTask(this.taskId);
  this.getTaskItems();
  this.getAttachmentsById(this.taskId);
  this.getComments();


 }

 decideDependentLinkCSS( parentName: string ) {
  if (parentName !== 'null') {
    return  this.taskLinkCss = 'clickable_task';
  } else {
    return  this.taskLinkCss = 'no_task';
  }
}

hideDialog() {
  this.showPopUp = false;
}


getAttachmentPath(attachment: any): string {
  return (
    Enums.commonURLs.cdnUrl + 'ManualTasks/' +
    this.taskId +
    '/' +
    attachment.filePath
  );
}



// onStatusChange(statusId: number, statusName: string) {
//   this.statusShow = false;
//   this.statusName = statusName;
//   this.decideStatus(this.statusName);
//   this.helperService.get(this.manualTaskURL + 'task/' + this.taskId + '/' + statusId).subscribe(result => {
//     if (result.success === true) {
//       this.getRelatedTask(this.taskId);
//       this.helperService.notify(Enums.notificationMessageHeader.updateRecord, Enums.notificationMessageType.updateRecordSuccessfully);
//       this.grid();
//     }
//   });
// }



onStatusChange(statusId: number, statusName: string) {

  this.statusShow = false;
  const removeCompletedTaskStatus = this.statusName;
  this.statusName = statusName;
  this.appService.checkStatus(statusName);
  this.getRelatedTask(this.taskId);
  this.helperService.get(this.manualTaskURL + 'task/' + this.taskId + '/' + statusId).subscribe(result => {
    if (result.data === 1) {
      if (statusId === 4) {
        this.showHoursPopUp = true;
      }
      this.getRelatedTask(this.taskId);
      this.helperService.notify(Enums.notificationMessageHeader.updateRecord, Enums.notificationMessageType.updateRecordSuccessfully);
      this.grid();
    } else {
      this.helperService.notify(Enums.notificationMessageHeader.error, Enums.notificationMessageType.ParentTaskNotCompleted,
         Enums.messageType.Error);
         this.appService.checkStatus(removeCompletedTaskStatus);
    }
  });
}


saveComment(ParentId: Number) {
  let comment;
  if (ParentId === 0) {
    comment = this.parentComment;
  } else if (ParentId > 0) {
    comment = this.childComment;
  }
  this.helperService.post(this.projectCommentURL + 'savecomment', {
    RecordId: this.taskId,
    ParentId: ParentId,
    Preview: comment,
    RecordType: Enums.Type.ManualTask,
  }).subscribe(result => {
    this.parentComment = null;
    this.childComment = '';
    this.getComments();
  });
}

getComments() {
  const url = this.CommentUrl + 'listbyid';
  this.helperService.post(url, this.setCommentRequest()).subscribe(result => {
    this.CommentList = result.data;
  });
}







setCommentRequest(): any {
  // const abc = this.taskId;
  return {
    CommentFilter: {
      RecordId: this.taskId,
      RecordType: Enums.Type.ManualTask
    }
  };
}

edit() {
  // const Id = rowData.id;
  this.router.navigate(['../tasks/edit/', this.taskId]);
}


decideFlag(flagName: string) {
  return this.appService.checkFlag(flagName);
}



decideStatus(status: string) {
  return  this.appService.checkStatus(status);
  }


  goToTask(taskDetail: any) {
    this.ParentId = taskDetail.id;
    this.onRowSelect2();
  }



    // this.appService.getRelatedTasks(this.taskId).subscribe (result => {
    //   this.dependencyTableList = result.data;
    //   if (Object.keys(this.dependencyTableList).length > 1 ) {
    //     this.DonotShowOneTask = true ;
    //   } else {
    //     this.DonotShowOneTask = false;
    //   }
    //  });
  getRelatedTask(taskId: number) {
    this.appService.getRelatedTasks(taskId).subscribe (result => {
     this.dependencyTableList = result.data;
     if (Object.keys(this.dependencyTableList).length > 1 ) {
       this.DonotShowOneTask = true ;
     } else {
       this.DonotShowOneTask = false;
     }
    });
   }



   getAttachmentsById(taskId: number) {
    this.helperService.get(this.attachmentUrl + 'all?id=' + this.taskId + '&recordType=' +
    Enums.RecordType.ManualTask).subscribe(result => {
      this.attachmentList = result.data;
    });
   }











   getTaskItems() {
    this.appService.getTaskItems(this.taskId).subscribe(result => {
      this.taskItemList = result.data;
    });
  }

  editTaskItem(rowData: any) {
    this.showTaskItemPopUp = true;
    this.showIsCompleted = false;
    this.ItemId = rowData.id;
    this.taskItemName = rowData.name;
    this.isCompleted = rowData.isCompleted;
  }



  saveTaskItems() {
    this.showTaskItemPopUp = true;
    const taskItems: TaskItems = new TaskItems();
    taskItems.Id = this.ItemId;
    taskItems.TaskId = this.taskId;
    taskItems.Name = this.taskItemName;
    this.helperService.post(this.manualTaskURL + 'saveitem', taskItems).subscribe(result => {
      if (result) {
        this.helperService.notify(
          Enums.notificationMessageHeader.saveRecord,
          Enums.notificationMessageType.changesSaved
        );
        this.showTaskItemPopUp = false;
        this.taskItemName = '';
        this.getTaskItems();
      }
    });
  }


  updateTaskitemStatus(taskItem) {
    this.helperService.get(this.manualTaskURL + 'updateitem/' + taskItem.id).subscribe(result => {
      if (result.data !== 0) {
        this.showHoursPopUp = false;
        this.helperService.notify(Enums.notificationMessageHeader.updateRecord, Enums.notificationMessageType.updateRecordSuccessfully);
        this.grid();
      } else {
        this.helperService.notify(Enums.notificationMessageHeader.error, Enums.notificationMessageType.TaskItemOfOthers,
          Enums.messageType.Error);
      }
    });


  }


  deleteItem(rowData) {
    //  const id = rowData.id;
    this.helperService.confirm(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deleteConfirmation)
      .subscribe(res => {
        if (res === true) {
          return this.appService.delete('tasks/deleteitem/', rowData.id).subscribe(result => {
            if (result.success === true) {
              this.helperService.notify(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deletedSuccessfully);
              this.getTaskItems();
            }
          });
        }
      });
  }


  showSaveItemsPopUp() {
    this.showIsCompleted = false;
    this.showTaskItemPopUp = true;
    this.ItemId = null;
    this.taskItemName = '';
  }


  UpdateCompletedTaskTime() {
    this.helperService.get(this.manualTaskURL + 'time/' + this.taskId + '/' + this.TimeTaken).subscribe(result2 => {
      if (result2.success === true) {
        this.showHoursPopUp = false;
        this.helperService.notify(Enums.notificationMessageHeader.updateRecord, Enums.notificationMessageType.updateRecordSuccessfully);
      } else {
        this.helperService.notify(Enums.notificationMessageHeader.error, Enums.notificationMessageType.updateRecordFailed,
          Enums.messageType.Error);
      }
    });
  }


  deleteComment(id: number) {
    this.helperService.confirm(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deleteConfirmation)
      .subscribe(res => {
        if (res === true) {
          return this.appService.delete('tasks/deletecomment/', id).subscribe(result => {
            if (result.success === true) {
              this.helperService.notify(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deletedSuccessfully);
              this.getComments();
            } else {
              this.helperService.notify(Enums.notificationMessageHeader.error, Enums.notificationMessageType.deletedFailedAsDifferentUser,
                 Enums.messageType.Error);
            }
          });
        }
      });
    }



      openClickOnSpecificTask(rowData) {
        this.taskId = rowData.data.id;
        if (this.taskId > 0) {
          this.showDetailComponent = false;
          this.taskIdOfParentComponent = this.taskId ;
          setTimeout(() => {
            this.showDetailComponent = true;
       }, 10);
        }
    }



















}
