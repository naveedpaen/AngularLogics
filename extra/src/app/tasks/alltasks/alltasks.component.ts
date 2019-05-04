import { Component, OnInit } from '@angular/core';
import * as Enums from '../../shared/services/enum.service';
import { HelperService } from '../../shared/services/helper.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../shared/services/app.service';
import { TasksService } from '../tasks.service';


class TaskItems {
  Id: number;
  TaskId: number;
  Name: string;
  IsCompleted: number;
}


@Component({
  selector: 'app-alltasks',
  templateUrl: './alltasks.component.html',
  styleUrls: ['./alltasks.component.css'],
})
export class AlltasksComponent implements OnInit {

  //#region Variables
  manualTaskURL = Enums.commonURLs.supderAdminAPI + 'tasks/';
  attachmentUrl = Enums.commonURLs.supderAdminAPI + 'attachments/';
  formGroup: FormGroup;
  pageNumber = Enums.gridPaginator.defaultOrFirstPage;  //  1
  pageSize = Enums.gridPaginator.defaultPageSize;     // 25
  orderByAsc = false;
  sortColumn = 'id';
  loading = true;
  page = Enums.gridPaginator.defaultOrFirstPage;
  rowsPerPageOptions: any = this.helperService.config.rowsPerPageOptions;
  currentPage = Enums.gridPaginator.defaultOrFirstPage;
  tableColumns: any;

  allTasksLists: any;
  taskList: any;
  portalList: any;
  projectList: number;
  accountantList: any;
  assignedList: any;
  priorityList: any;
  statusList: any;
  productList: any;
  totalRecords: number;
  busySearching: false;


  showPopUp = false;
  StatusText: string;
  statusShow = true;
  completedOrNor: boolean;

  // commments
  CommentUrl = Enums.commonURLs.supderAdminAPI + 'issuecomment/';
  projectCommentURL = Enums.commonURLs.supderAdminAPI + 'project/';
  parentComment: string;
  childComment = '';
  ParentId = 0;
  CommentList: any;
  mytaskId: number;
  attachmentList: any;




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
  parentName: string;


  dependencyColumns: any;
  dependencyTableList: any;
  dependencyLoading: false;
  DonotShowOneTask = false;
  taskLinkCss: string;

  showHoursPopUp = false;
  TimeTaken: string;

  // Task Items variables
  taskItemCols: any;
  taskItemList: any;
  showTaskItemPopUp = false;
  isCompleted: string;
  taskItemName: string;
  showIsCompleted: boolean;
  ItemId: number;

  showDetailComponent = false;
  taskIdOfParentComponent: number;




  //#endregion



  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private helperService: HelperService,
    private tasksService: TasksService
  ) {
    this.formGroup = formBuilder.group({
      id: '',
      name: '',
      description: '',
      targetDate: '',
      completeDate: '',
      portalId: '',
      projectId: { value: '', disabled: false },
      productId: { value: '', disabled: false },
      assignedToId: { value: '', disabled: false },
      accountantId: { value: '', disabled: false },
      priorityId: '',
      statusId: '',
    });

    this.statusListDD = this.appService.StatusList();
  }

  ngOnInit() {
    this.load();

    this.tableColumns = [
      { field: 'name', header: 'Task', width: 440 },
      { field: 'statusName', header: 'Status', width: 50 },
      { field: 'startDate', header: 'Created', width: 65 },
    ];

    this.taskItemCols = [
      { field: 'name', header: 'Name', width: 550 },
      { field: 'isCompleted', header: 'isComplete' },
    ];

    this.statusListDD = this.appService.StatusList();

  }




  load() {
    this.grid(event);
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
    const pageRequest: any = {
      'SortColumn': this.sortColumn,
      'OrderByAsc': this.orderByAsc,
      'PageNo': this.pageNumber,
      'PageSize': this.pageSize,
    };
    this.appService.paged('tasks/paged', pageRequest).subscribe(result => {
      this.loading = false;
      const lists = result.result.data;
      this.taskList = lists.data;
      this.totalRecords = lists.totalRecords;
      this.busySearching = false;
    });
  }


  paginate(event) {
    this.pageNumber = (event.first + Number(event.rows)) / Number(event.rows);
    this.pageSize = event.rows;
    this.grid(event);
  }

  edit() {
    this.router.navigate(['../tasks/edit/', this.taskId]);
  }


  onPortalChange() {
    this.formGroup.get('projectId').enable();
    this.formGroup.get('productId').enable();
    this.formGroup.get('assignedToId').enable();
    this.formGroup.get('accountantId').enable();
    this.appService.OnPortalChange(this.getSelectedValueOf('portalId')).subscribe(result => {
      this.projectList = result.data.projectList;
      this.assignedList = result.data.assigneeList;
      this.priorityList = result.data.priorityList;
      this.statusList = result.data.statusList;
      this.productList = result.data.productList;
      this.accountantList = result.data.accountantList;
    });
  }


  onAccountantChange() {
    this.tasksService.onAccountantChange(this.getSelectedValueOf('accountantId')).subscribe(result => {
      this.projectList = result.data.projectList;
    });
  }


  onProjectChange() {
    this.tasksService.onProjectChange(this.getSelectedValueOf('projectId')).subscribe(result => {
      this.productList = result.data.productList;
    });
  }


  search() {
    const ManualTasksFilter: any = {
      'portalId': this.getSelectedValueOf('portalId'),
      'projectId': this.getSelectedValueOf('projectId'),
      'productId': this.getSelectedValueOf('productId'),
      'assignedToId': this.getSelectedValueOf('assignedToId'),
      'accountantId': this.getSelectedValueOf('accountantId'),
    };
    const pageRequest: any = {
      'SortColumn': this.sortColumn,
      'OrderByAsc': this.orderByAsc,
      'PageNo': this.page,
      'PageSize': this.pageSize,
      'ManualTasksFilter': ManualTasksFilter,
    };
    this.appService.paged('tasks/paged', pageRequest).subscribe(result => {
      this.loading = false;
      const list = result.result.data;
      this.taskList = list.data;
      this.totalRecords = list.totalRecords;
    });
  }

  clear() {
    this.formGroup.reset();
    this.grid(event);
  }

  getSelectedValueOf(selectedId: string) {
    return this.formGroup.get(selectedId).value;
  }


  sort(event) {
    if (event.sortField !== undefined) {
      this.sortColumn = event.sortField;
      if (event.sortOrder === Enums.orderBy.ascending) {
        this.orderByAsc = true;
      } else {
        this.orderByAsc = false;
      }
      this.grid(event);
    }
  }

  decideStatus(status: string) {
    return this.appService.checkStatus(status);
  }

  decideFlag(flagName: string) {
    return this.appService.checkFlag(flagName);
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



// Delete


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
  //     this.TimeTaken = event.data.timeTaken;
  //     if (event.data.parentName !== null) {
  //       this.parentName = event.data.parentName;
  //       this.taskLinkCss = this.appService.decideDependentLinkCSS(this.parentName);
  //     } else {
  //       this.parentName = 'No Task';
  //       this.taskLinkCss = this.appService.decideDependentLinkCSS('null');
  //     }

  //     this.getTaskItems();
  //     this.getRelatedTask(this.taskId);
  //     this.getAttachmentsById(this.taskId);
  //     this.getComments();
  //   }
  // }




  // onRowSelect2() {
  //   this.taskId = this.ParentId;
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
  //     this.TimeTaken = data.timeTaken;
  //     if (data.parentName === null) {
  //       this.parentName = 'No Task';
  //       this.taskLinkCss = this.appService.decideDependentLinkCSS('null');
  //     } else {
  //       this.parentName = data.parentName;
  //       this.taskLinkCss = this.appService.decideDependentLinkCSS(this.parentName);
  //     }
  //     this.ParentId = data.parentId;
  //   });

  //   this.getRelatedTask(this.taskId);
  //   this.getTaskItems();
  //   this.getAttachmentsById(this.taskId);
  //   this.getComments();
  // }

  // getAttachmentPath(attachment: any): string {
  //   return (
  //     Enums.commonURLs.cdnUrl + 'ManualTasks/' +
  //     this.taskId +
  //     '/' +
  //     attachment.filePath
  //   );
  // }




  // // onStatusChange(statusId: number, statusName: string) {
  // //   this.statusShow = false;
  // //   this.statusName = statusName;
  // //   this.appService.checkStatus(status);
  // //   this.helperService.get(this.manualTaskURL + 'task/' + this.taskId + '/' + statusId).subscribe(result => {
  // //     if (result.success === true) {
  // //       this.getRelatedTask(this.taskId);
  // //       this.helperService.notify(Enums.notificationMessageHeader.updateRecord,
  //   Enums.notificationMessageType.updateRecordSuccessfully);
  // //       this.grid(this.completedOrNor);

  // //     }
  // //   });
  // // }


  // onStatusChange(statusId: number, statusName: string) {
  //   this.statusShow = false;
  //   debugger;

  //   const removeCompletedTaskCSS = this.statusName;
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
  //       // this.decideStatus(removeCompletedTaskCSS); Not working
  //       this.ParentId = this.taskId;
  //       this.onRowSelect2();
  //     }
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
  //     this.childComment = '';
  //     this.getComments();
  //   });
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



  // getTaskItems() {
  //   this.appService.getTaskItems(this.taskId).subscribe(result => {
  //     this.taskItemList = result.data;

  //   });
  // }

  // editTaskItem(rowData: any) {
  //   this.showTaskItemPopUp = true;
  //   this.showIsCompleted = false;
  //   this.ItemId = rowData.id;
  //   this.taskItemName = rowData.name;
  //   this.isCompleted = rowData.isCompleted;
  // }



  // saveTaskItems() {
  //   this.showTaskItemPopUp = true;
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
  //       this.grid(event);
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
  //   this.showIsCompleted = false;
  //   this.showTaskItemPopUp = true;
  //   this.ItemId = null;
  //   this.taskItemName = '';
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
  //    Enums.notificationMessageType.deletedFailedAsDifferentUser,
  //               Enums.messageType.Error);
  //           }
  //         });
  //       }
  //     });
  // }






}
