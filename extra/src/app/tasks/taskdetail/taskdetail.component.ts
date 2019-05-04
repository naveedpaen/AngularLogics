import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChange } from '@angular/core';
import * as Enums from '../../shared/services/enum.service';
import { HelperService } from '../../shared/services/helper.service';
import { TasksService } from '../tasks.service';
import { AppService } from '../../shared/services/app.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskItem } from '../../shared/models/tasks/taskitem.model';


@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.css']
})
export class TaskdetailComponent implements OnInit ,  OnChanges {
  taskDetailPopUp = false;
  PopupTaskItem = false;
  PopupTaskCompletedInTime = false;
  TimeTaken: string;



  manualTaskURL = Enums.commonURLs.supderAdminAPI + 'tasks/';
  attachmentUrl = Enums.commonURLs.supderAdminAPI + 'attachments/';
  CommentUrl = Enums.commonURLs.supderAdminAPI + 'issuecomment/';
  projectCommentURL = Enums.commonURLs.supderAdminAPI + 'project/';
  taskId: number;
  ParentId: number;
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

  taskLinkCss: string;
  attachmentList: any;
  dependencyTableList: any;
  DonotShowOneTask = false;
  taskItemList: any;
  CommentList: any;
  taskItemCols: any;

  taskItemId: number;
  taskItemName: string;
  parentComment: string;
  childComment = '';
  noTaskCSS = 'no_task';
  clickable_taskCSS = 'clickable_task';
  showHideDescription = false;
  showHideAttachmentList = false;
  showHideTaskItems = false;

  // test = 'test';





  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private helperService: HelperService,
    private tasksService: TasksService,
    public router: Router
  ) { }
  @Input() id: number;
  @Output() eventToCallParentComponentMethod = new EventEmitter();
  ngOnInit() {
    // this.taskId = this.id;

    this.taskItemCols = [
      { field: 'name', header: 'Name', width: 550 },
      { field: 'isCompleted', header: 'isComplete' },
    ];
    this.statusListDD = this.appService.StatusList();
  }

  ngOnChanges(change) {
    this.taskId = change.id.currentValue;
    this.onRowSelect();
  }


  //  statusListDD



  onRowSelect() {
    this.taskDetailPopUp = true;
    if ((this.ParentId != undefined && this.ParentId > 0)) {
      this.taskId = this.ParentId;
    }
    this.helperService.get(this.manualTaskURL + 'task/' + this.taskId).subscribe(result => {
      const data = result.data.getTaskByIdViewModel[0];
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
      this.TimeTaken = data.timeTaken;
      if (data.parentName === null) {
        this.parentName = 'No Task';
        this.taskLinkCss = this.appService.decideDependentLinkCSS('null');
      } else {
        this.parentName = data.parentName;
        this.taskLinkCss = this.appService.decideDependentLinkCSS(this.parentName);
      }
      this.ParentId = data.parentId;

      if ( this.description !== '') {
        this.showHideDescription = true;
      }

    });

    this.getRelatedTask(this.taskId);
    this.getTaskItems();
    this.getAttachmentsById(this.taskId);
    this.getComments();
  }

  getRelatedTask(taskId: number) {
    this.appService.getRelatedTasks(taskId).subscribe(result => {
      this.dependencyTableList = result.data;
      if (Object.keys(this.dependencyTableList).length > 1) {
        this.DonotShowOneTask = true;
      } else {
        this.DonotShowOneTask = false;
      }
    });
  }


  getTaskItems() {
    this.appService.getTaskItems(this.taskId).subscribe(result => {
      this.taskItemList = result.data;
      if (this.taskItemList.length !== 0) {
        this.showHideTaskItems = true;
      }

    });
  }

  getAttachmentsById(taskId: number) {
    this.helperService.get(this.attachmentUrl + 'all?id=' + this.taskId + '&recordType=' +
      Enums.RecordType.ManualTask).subscribe(result => {
        this.attachmentList = result.data;
        if (this.attachmentList.length !== 0) {
          this.showHideAttachmentList = true;
        }
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


  decideStatus(status: string) {
    return this.appService.checkStatus(status);
  }

  decideFlag(flagName: string) {
    return this.appService.checkFlag(flagName);
  }


  edit() {
    this.router.navigate(['../tasks/edit/', this.taskId]);
  }






  PopUpTaskItem() {
    // this.showIsCompleted = false;
    this.PopupTaskItem = true;
    this.taskItemId = null;
    this.taskItemName = '';
  }

  saveTaskItems() {
    const taskItems: TaskItem = new TaskItem();
    taskItems.Id = this.taskItemId;
    taskItems.TaskId = this.taskId;
    taskItems.Name = this.taskItemName;
    this.helperService.post(this.manualTaskURL + 'saveitem', taskItems).subscribe(result => {
      if (result) {
        this.helperService.notify(
          Enums.notificationMessageHeader.saveRecord,
          Enums.notificationMessageType.changesSaved
        );
        this.PopupTaskItem = false;
        this.taskItemName = '';
        this.getTaskItems();
      }
    });
  }

  editTaskItem(rowData: any) {
    this.PopupTaskItem = true;
    this.taskItemId = rowData.id;
    this.taskItemName = rowData.name;
  }


  updateTaskitemStatus(taskItem: any) {
    this.helperService.get(this.manualTaskURL + 'updateitem/' + taskItem.id).subscribe(result => {
      if (result.data !== 0) {
        this.helperService.notify(Enums.notificationMessageHeader.updateRecord, Enums.notificationMessageType.updateRecordSuccessfully);
      } else {
        this.helperService.notify(Enums.notificationMessageHeader.error, Enums.notificationMessageType.TaskItemOfOthers,
          Enums.messageType.Error);
      }
    });
  }


  delete() {
    this.helperService.confirm(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deleteConfirmation)
      .subscribe(res => {
        if (res === true) {
          return this.appService.delete('tasks/delete/', this.taskId).subscribe(result => {
            if (result.data === 1) {
              this.helperService.notify(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deletedSuccessfully);
              this.taskDetailPopUp = false;
              this.eventToCallParentComponentMethod.next();
            } else {
              this.helperService.notify(Enums.notificationMessageHeader.error, Enums.notificationMessageType.OthersTasksCanotBeDeleted,
                Enums.messageType.Error);
            }
          });
        }
      });
  }


  deleteTaskItem(rowData) {
    this.helperService.confirm(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deleteConfirmation)
      .subscribe(res => {
        if (res === true) {
          return this.appService.delete('tasks/deleteitem/', rowData.id ).subscribe(result => {
            if (result.data === 1) {
              this.helperService.notify(Enums.notificationMessageHeader.deleteRecord, Enums.notificationMessageType.deletedSuccessfully);
              this.getTaskItems();
            } else {
              this.helperService.notify(Enums.notificationMessageHeader.error, Enums.notificationMessageType.OthersTasksItemsCanotBeDeleted,
                Enums.messageType.Error);
            }
          });
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


  getAttachmentPath(attachment: any): string {
    return (
      Enums.commonURLs.cdnUrl + 'ManualTasks/' +
      this.taskId +
      '/' +
      attachment.filePath
    );
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
      this.childComment = null;
      this.getComments();
    });
  }





  onStatusChange(statusId: number, statusName: string) {
    const currentStatusName = this.statusName;
    this.statusName = statusName;
    this.helperService.get(this.manualTaskURL + 'task/' + this.taskId + '/' + statusId).subscribe(result => {
      if (result.data === 1) {
        if (statusId === 4) {
          this.PopupTaskCompletedInTime = true;
        }
        //   this.decideStatus(statusName);
        this.getRelatedTask(this.taskId);
        this.helperService.notify(Enums.notificationMessageHeader.updateRecord, Enums.notificationMessageType.updateRecordSuccessfully);
        //  this.grid(this.completedOrNor);
        this.eventToCallParentComponentMethod.next();
      } else {
        this.helperService.notify(Enums.notificationMessageHeader.error, Enums.notificationMessageType.ParentTaskNotCompleted,
          Enums.messageType.Error);
        //  this.decideStatus(currentStatusName);
        // this.appService.checkStatus(currentStatusName);
        this.onRowSelect();

      }
    });
  }



  UpdateCompletedTaskTime() {
    this.helperService.get(this.manualTaskURL + 'time/' + this.taskId + '/' + this.TimeTaken).subscribe(result2 => {
      if (result2.success === true) {
        this.PopupTaskCompletedInTime = false;
        this.helperService.notify(Enums.notificationMessageHeader.updateRecord, Enums.notificationMessageType.updateRecordSuccessfully);
      } else {
        this.helperService.notify(Enums.notificationMessageHeader.error, Enums.notificationMessageType.updateRecordFailed,
          Enums.messageType.Error);
      }
    });
  }



  goToTask(taskDetail: any) {
    this.ParentId = taskDetail.id;
    this.onRowSelect();
  }








}





