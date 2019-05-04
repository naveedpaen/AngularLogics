import { TasksService } from './../tasks.service';
import { Subscription } from 'rxjs';
import { AppService } from './../../shared/services/app.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Enums from '../../shared/services/enum.service';
import { HelperService } from '../../shared/services/helper.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventEmitter } from 'events';


class TaskItems {
  Id: number;
  TaskId: number;
  Name: string;
  IsCompleted: number;
}

@Component({
  selector: 'app-mytask',
  templateUrl: './mytask.component.html',
  styleUrls: ['./mytask.component.css']
})
export class MytaskComponent implements OnInit, OnDestroy {


  //#region Variables
 
  manualTaskURL = Enums.commonURLs.supderAdminAPI + 'tasks/';
  attachmentUrl = Enums.commonURLs.supderAdminAPI + 'attachments/';
  pageNumber = Enums.gridPaginator.defaultOrFirstPage;  //  1
  pageSize = Enums.gridPaginator.defaultPageSize;     // 25
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
  projectList: number;
  accountantList: any;
  assignedList: any;
  priorityList: any;
  statusList: any;
  productList: any;
  formGroup: FormGroup;
  logedInUser: string;
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
  private onStatusChangeSubscription: Subscription;
  private getCommentsSubscription: Subscription;
  private saveCommentSubscription: Subscription;

  parentName: string;

  dependencyTableList: any;
  DonotShowOneTask = false;
  noTaskCSS = 'no_task';
  clickable_taskCSS = 'clickable_task';
  taskLinkCss: string;

  showHoursPopUp = false;
  // task item
  taskItemCols: any;
  taskItemList: any;
  showTaskItemPopUp = false;
  isCompleted: string;
  taskItemName: string;
  // showIsCompleted: boolean;
  ItemId: number;
  TimeTaken: string;

  taskIdOfParentComponent: number;
  showDetailComponent = false;
  //#endregion

  constructor(
    private router: Router,
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private tasksService: TasksService
  ) {
    this.formGroup = formBuilder.group({
      id: '',
      name: '',
      description: '',
      startDate: '',
      targetDate: '',
      completeDate: '',
      portalId: '',
      projectId: '',
      productId: { value: '', disabled: true },
      assignedToId: '',
      priorityId: '',
      statusId: '',
      allTasks: '',
    });


    this.statusListDD = this.appService.StatusList();
  }
  emmiter: EventEmitter = new EventEmitter();

  ngOnInit() {
    // this.activatedRoute.params.subscribe(result => {
    //   this.taskId = <number>result.Id;
    //   // if (this.taskId > 0) {
    //   //   this.showPopUp = true;
    //   //   this.onRowSelect2();
    //   // }
    // });

    this.taskItemCols = [
      { field: 'name', header: 'Name', width: 550 },
      { field: 'isCompleted', header: 'isComplete' },
    ];


    this.load();

    this.tableColumns = [
      { field: 'name', header: 'Description', width: 440, },
      { field: 'statusName', header: 'Status', width: 50 },
      { field: 'startDate', header: 'Created', width: 70 },
    ];
  }


  load() {

    this.grid(undefined);

    // .....  Portal List DropDown
    this.appService.getPortalsList().subscribe(result => {
      this.portalList = result.data;
    });
  }



  grid(event) {
    if (this.completedOrNor === true && event === false) {
      this.pageNumber = 1;
    }
    this.completedOrNor = event;
    if (event === undefined) {
      event = false;
    }
    const ManualTasksFilter: any = {
      'portalId': '',
      'projectId': '',
      'productId': '',
      'allTasks': event,
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
      this.logedInUser = result.logedInUser;
      this.taskList = result.data.data;
      this.totalRecords = result.data.totalRecords;
      this.busySearching = false;
    });
  }

  onPortalChange() {
    this.formGroup.get('productId').enable();
    const abc = this.getSelectedValueOf('portalId');
    this.appService.OnPortalChange(this.getSelectedValueOf('portalId')).subscribe(result => {
      this.projectList = result.data.projectList;
      this.productList = result.data.productList;
    });
  }


  search() {
    const manualTasksFilter: any = {
      'portalId': this.getSelectedValueOf('portalId'),
      'projectId': this.getSelectedValueOf('projectId'),
      'productId': this.getSelectedValueOf('productId'),
    };
    const pageRequest: any = {
      'SortColumn': this.sortColumn,
      'OrderByAsc': this.orderByAsc,
      'PageNo': this.pageNumber,
      'PageSize': this.pageSize,
      'ManualTasksFilter': manualTasksFilter,
    };
    const abc = this.getSelectedValueOf('projectId');
    this.appService.paged('tasks/mytaskspaged', pageRequest).subscribe(result => {
      this.loading = false;
      const list = result.data;
      this.taskList = list.data;
      this.totalRecords = list.totalRecords;
    });
  }



  edit() {
    this.router.navigate(['../tasks/edit/', this.taskId]);
  }

  getSelectedValueOf(selected: string) {
    return this.formGroup.get(selected).value;
  }

  clear() {
    this.formGroup.reset();
    this.grid(this.completedOrNor);
  }


  paginate(event) {
    this.pageNumber = (event.first + Number(event.rows)) / Number(event.rows);
    this.pageSize = event.rows;
    this.grid(this.completedOrNor);
  }

  sort(event) {
    if (event.sortField !== undefined) {
      this.sortColumn = event.sortField;
      if (event.sortOrder === Enums.orderBy.descending) {
        this.orderByAsc = true;
      } else {
        this.orderByAsc = false;
      }
      this.grid(this.completedOrNor);
    }
  }


  ngOnDestroy(): void {
    if (this.onStatusChangeSubscription !== undefined) {
      this.onStatusChangeSubscription.unsubscribe();
    }
  }

  onClickOnSpecificTask(rowData) {
   this.taskId =  rowData.data.id ;
    if (this.taskId > 0) {
      this.showDetailComponent = false;
      this.taskIdOfParentComponent = this.taskId ;
      setTimeout(() => {
        this.showDetailComponent = true;
   }, 10);
    }
}

decideFlag(flagName: string) {
  return this.appService.checkFlag(flagName);
}

decideStatus(status: string) {
  return this.appService.checkStatus(status);
}

}




  // delete() {
  //   this.helperService.confirm(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deleteConfirmation)
  //     .subscribe(res => {
  //       if (res === true) {
  //         return this.appService.delete('tasks/delete/', this.taskId).subscribe(result => {
  //           if (result.success === true) {
  //             this.helperService.notify(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deletedSuccessfully);
  //             this.showPopUp = false;
  //             this.load();
  //           }
  //         });
  //       }
  //     });
  // }

  // onRowSelect(event) {
  //   if (event.data.id > 0) {
  //     this.showPopUp = true;
  //     this.taskId = event.data.id;
  //     this.ParentId = event.data.parentId;
  //     this.name = event.data.name;
  //     this.accountantName = event.data.accountantName;
  //     this.assignedtoName = event.data.assignedtoName;
  //     this.priorityName = event.data.priorityName;
  //     this.productName = event.data.productName;
  //     this.projectName = event.data.projectName;
  //     this.statusName = event.data.statusName;
  //     this.targetDate = event.data.targetDate;
  //     this.startDate = event.data.startDate;
  //     this.portalName = event.data.portalName;
  //     this.description = event.data.description;


  //     if (event.data.parentName !== null) {
  //       this.parentName = event.data.parentName;
  //       // this.decideDependentLinkCSS(this.parentName);
  //       this.taskLinkCss = this.appService.decideDependentLinkCSS(this.parentName);
  //     } else {
  //       this.parentName = 'No Task';
  //       // this.decideDependentLinkCSS('null');
  //       this.taskLinkCss = this.appService.decideDependentLinkCSS('null');
  //     }


  //     this.getRelatedTask(this.taskId);
  //     this.getTaskItems();
  //     this.getAttachmentsById(this.taskId);
  //     this.getComments();

  //     // this.appService.getRelatedTasks(this.taskId).subscribe (result => {
  //     //   this.dependencyTableList = result.data;
  //     //   if (Object.keys(this.dependencyTableList).length > 1 ) {
  //     //     this.DonotShowOneTask = true ;
  //     //   } else {
  //     //     this.DonotShowOneTask = false;
  //     //   }
  //     //  });


  //     // this.helperService.get(this.attachmentUrl + 'all?id=' + this.taskId + '&recordType=' +
  //     //   Enums.RecordType.ManualTask).subscribe(result => {
  //     //     this.attachmentList = result.data;
  //     //   });



  //   }
  // }


  // onRowSelect2() {
  //   if (this.ParentId !== 0) {
  //     this.taskId = this.ParentId;
  //   }
  //   this.helperService.get(this.manualTaskURL + 'task/' + this.taskId).subscribe(result => {
  //     const data = result.data.getTaskByIdViewModel[0];
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
  //     if (data.parentName === null) {
  //       this.parentName = 'No Task';
  //       this.decideDependentLinkCSS('null');
  //     } else {
  //       this.parentName = data.parentName;
  //       this.decideDependentLinkCSS(this.parentName);
  //     }
  //     this.ParentId = data.parentId;
  //   });


  //   this.getRelatedTask(this.taskId);
  //   this.getTaskItems();
  //   this.getAttachmentsById(this.taskId);
  //   this.getComments();
  //   // this.appService.getRelatedTasks(this.taskId).subscribe (result => {
  //   //   this.dependencyTableList = result.data;
  //   //   if (Object.keys(this.dependencyTableList).length > 1 ) {
  //   //     this.DonotShowOneTask = true ;
  //   //   } else {
  //   //     this.DonotShowOneTask = false;
  //   //   }
  //   //  });


  //   // this.helperService.get(this.attachmentUrl + 'all?id=' + this.taskId + '&recordType=' +
  //   //   Enums.RecordType.ManualTask).subscribe(result => {
  //   //     this.attachmentList = result.data;
  //   //   });


  // }

  // hideDialog() {
  //   this.showPopUp = false;
  // }

  // onStatusChange(statusId: number, statusName: string) {
  //   this.statusShow = false;
  //   const removeCompletedTaskStatus = this.statusName;
  //   this.statusName = statusName;
  //   this.appService.checkStatus(statusName);
  //   this.getRelatedTask(this.taskId);
  //   this.helperService.get(this.manualTaskURL + 'task/' + this.taskId + '/' + statusId).subscribe(result => {
  //     if (result.data === 1) {
  //       if (statusId === 4) {
  //         this.showHoursPopUp = true;
  //       }
  //       this.getRelatedTask(this.taskId);
  //       this.helperService.notify(Enums.notificationMessageHeader.updateRecord, Enums.notificationMessageType.updateRecordSuccessfully);
  //       this.grid(this.completedOrNor);
  //     } else {
  //       this.helperService.notify(Enums.notificationMessageHeader.error, Enums.notificationMessageType.ParentTaskNotCompleted,
  //         Enums.messageType.Error);
  //       this.appService.checkStatus(removeCompletedTaskStatus);
  //     }
  //   });
  // }

  // saveComment(ParentId: Number) {
  //   let comment;
  //   if (ParentId === 0) {
  //     comment = this.parentComment;
  //   } else if (ParentId > 0) {
  //     comment = this.childComment;
  //   }
  //   this.helperService.post(this.projectCommentURL + 'savecomment', {
  //     RecordId: this.taskId,
  //     ParentId: ParentId,
  //     Preview: comment,
  //     RecordType: Enums.Type.ManualTask,
  //   }).subscribe(result => {
  //     this.parentComment = null;
  //     this.childComment = null;
  //     this.getComments();
  //   });
  // }

  // getComments() {
  //   const url = this.CommentUrl + 'listbyid';
  //   this.helperService.post(url, this.setCommentRequest()).subscribe(result => {
  //     this.CommentList = result.data;
  //   });
  // }

  // setCommentRequest(): any {
  //   // const abc = this.taskId;
  //   return {
  //     CommentFilter: {
  //       RecordId: this.taskId,
  //       RecordType: Enums.Type.ManualTask
  //     }
  //   };
  // }


  // decidePriority(PriorityName: string) {
  //   return this.appService.decidePriority(PriorityName);
  // }



  // decideDependentLinkCSS(parentName: string) {
  //   if (parentName !== 'null') {
  //     return this.taskLinkCss = 'clickable_task';
  //   } else {
  //     return this.taskLinkCss = 'no_task';
  //   }
  // }

  // goToTask(taskDetail: any) {
  //   this.ParentId = taskDetail.id;
  //   this.onRowSelect2();
  // }


  // getRelatedTask(taskId: number) {
  //   this.appService.getRelatedTasks(taskId).subscribe(result => {
  //     this.dependencyTableList = result.data;
  //     if (Object.keys(this.dependencyTableList).length > 1) {
  //       this.DonotShowOneTask = true;
  //     } else {
  //       this.DonotShowOneTask = false;
  //     }
  //   });
  // }


  // getAttachmentsById(taskId: number) {
  //   this.helperService.get(this.attachmentUrl + 'all?id=' + this.taskId + '&recordType=' +
  //     Enums.RecordType.ManualTask).subscribe(result => {
  //       this.attachmentList = result.data;
  //     });
  // }

  // getTaskItems() {
  //   this.appService.getTaskItems(this.taskId).subscribe(result => {
  //     this.taskItemList = result.data;
  //   });
  // }

  // editTaskItem(rowData: any) {
  //   this.showTaskItemPopUp = true;
  //   this.ItemId = rowData.id;
  //   this.taskItemName = rowData.name;
  //   this.isCompleted = rowData.isCompleted;
  // }


  // saveTaskItems() {
  //   // this.showTaskItemPopUp = true;
  //   const taskItems: TaskItems = new TaskItems();
  //   taskItems.Id = this.ItemId;
  //   taskItems.TaskId = this.taskId;
  //   taskItems.Name = this.taskItemName;
  //   this.helperService.post(this.manualTaskURL + 'saveitem', taskItems).subscribe(result => {
  //     if (result) {
  //       this.helperService.notify(
  //         Enums.notificationMessageHeader.saveRecord,
  //         Enums.notificationMessageType.changesSaved
  //       );
  //       this.showTaskItemPopUp = false;
  //       this.taskItemName = '';
  //       this.getTaskItems();
  //     }
  //   });
  // }


  // updateTaskitemStatus(taskItem) {
  //   this.helperService.get(this.manualTaskURL + 'updateitem/' + taskItem.id).subscribe(result => {
  //     if (result.data !== 0) {
  //       this.showHoursPopUp = false;
  //       this.helperService.notify(Enums.notificationMessageHeader.updateRecord, Enums.notificationMessageType.updateRecordSuccessfully);
  //       // this.grid(null);
  //     } else {
  //       this.helperService.notify(Enums.notificationMessageHeader.error, Enums.notificationMessageType.TaskItemOfOthers,
  //         Enums.messageType.Error);
  //     }
  //   });
  // }


  // deleteItem(rowData) {
  //   //  const id = rowData.id;
  //   this.helperService.confirm(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deleteConfirmation)
  //     .subscribe(res => {
  //       if (res === true) {
  //         return this.appService.delete('tasks/deleteitem/', rowData.id).subscribe(result => {
  //           if (result.success === true) {
  //             this.helperService.notify(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deletedSuccessfully);
  //             this.getTaskItems();
  //           }
  //         });
  //       }
  //     });
  // }


  // showSaveItemsPopUp() {
  //   // this.showIsCompleted = false;
  //   this.showTaskItemPopUp = true;
  //   this.ItemId = null;
  //   this.taskItemName = '';
  // }



  // UpdateCompletedTaskTime() {
  //   this.helperService.get(this.manualTaskURL + 'time/' + this.taskId + '/' + this.TimeTaken).subscribe(result2 => {
  //     if (result2.success === true) {
  //       this.showHoursPopUp = false;
  //       this.helperService.notify(Enums.notificationMessageHeader.updateRecord, Enums.notificationMessageType.updateRecordSuccessfully);
  //     } else {
  //       this.helperService.notify(Enums.notificationMessageHeader.error, Enums.notificationMessageType.updateRecordFailed,
  //         Enums.messageType.Error);
  //     }
  //   });
  // }


  // deleteComment(id: number) {
  //   this.helperService.confirm(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deleteConfirmation)
  //     .subscribe(res => {
  //       if (res === true) {
  //         return this.appService.delete('tasks/deletecomment/', id).subscribe(result => {
  //           if (result.success === true) {
  //             this.helperService.notify(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deletedSuccessfully);
  //             this.getComments();
  //           } else {
  //             this.helperService.notify(Enums.notificationMessageHeader.error,
  // Enums.notificationMessageType.deletedFailedAsDifferentUser,
  //               Enums.messageType.Error);
  //           }
  //         });
  //       }
  //     });
  // }

  // getAttachmentPath(attachment: any): string {
  //   return (
  //     Enums.commonURLs.cdnUrl + 'ManualTasks/' +
  //     this.taskId +
  //     '/' +
  //     attachment.filePath
  //   );
  // }

