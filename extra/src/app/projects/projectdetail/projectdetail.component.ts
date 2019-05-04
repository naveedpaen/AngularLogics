import { AppService } from './../../shared/services/app.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperService } from '../../shared/services/helper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import * as Enums from '../../shared/services/enum.service';
import { TaskdetailComponent } from '../../tasks/taskdetail/taskdetail.component';
@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.css'],
})
export class ProjectdetailComponent implements OnInit {
  // @ViewChild(TaskdetailComponent) child: TaskdetailComponent;


  header: string;
  projectId: number;
  attachmentList: any;
  attachmentUrl = Enums.commonURLs.supderAdminAPI + 'attachments/';
  description: string;
  clientName: string;
  tasksList: any;
  dataLoaded = false;
  parentComment: string;
  childComment: string;
  ParentId = 0;
  CommentList: any;
  showLoader: boolean;
  color = 'warn';
  taskHeader: string;
  startDate: Date;
  targetDate: Date;
  completionDate: Date;
  statusListDD: any;
  clientTypeList: any;
  selectedStatusId: number;
  tempTaskList: any;
  tempTaskList2: any;
  showDetailComponent = false;
  taskIdOfParentComponent: number;
  showTaskItemPopUp = false;
  taskNameOnPopupHeader: string;


  defaultUrl = Enums.commonURLs.supderAdminAPI + 'project/';
  autoTaskURL = Enums.commonURLs.supderAdminAPI + 'settings/';
  manualTaskURL = Enums.commonURLs.supderAdminAPI + 'tasks/';
  CommentUrl = Enums.commonURLs.supderAdminAPI + 'issuecomment/';
  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
  ) {

    this.statusListDD = this.appService.StatusList();
  }

  ngOnInit() {
    // this.tempTaskList = [];
    this.clientTypeList = [
      { id: '1', title: 'To Do' },
      { id: '2', title: 'In Progress' },
      { id: '3', title: 'Delay' },
      { id: '4', title: 'Completed' }
    ];

    // this.openSpecificTask(this.myVal);


    this.activatedRoute.params.subscribe(params => {
      const id = <number>params.id;
      this.projectId = id;
      if (id > 0) {
        this.showLoader = true;
        this.detail(id);
      } else {
        console.log('ID is null');
      }

      this.getComments();
    });
  }


  getAttachmentPath(attachment: any): string {
    return (
      Enums.commonURLs.cdnUrl + 'projects/' +
      attachment.recordId +
      '/' +
      attachment.filePath
    );
  }

  getTasks() {
    this.helperService.get(this.autoTaskURL + 'pagedbyproject/' + this.projectId).subscribe(result => {
      this.taskHeader = '';
      this.showLoader = false;
      this.tasksList = result.data;
      this.tempTaskList = result.data;
      this.tempTaskList2 = result.data;
      if (result.data.length === 0) {
        this.taskHeader = 'No Tasks';
      }
    });
  }

  detail(id: number) {
    this.helperService.get(this.defaultUrl + 'edit/' + id).subscribe(result => {
      this.projectId = result.data.id;
      this.header = result.data.name;
      this.description = result.data.description;
      this.clientName = result.data.accountantName;
      this.startDate = result.data.startDate;
      this.targetDate = result.data.targetDate;
      this.completionDate = result.data.completionDate;
      this.attachmentList = result.result2.attachments;
      this.getTasks();
    });
  }


  taskEdit(id) {
    this.router.navigate(['../tasks/edit/', id]);
  }

  taskStatus(data, statusId: number) {
    this.helperService.get(this.manualTaskURL + 'task/' + data.id + '/' + statusId).subscribe(result => {
      if (result.success === true) {
        this.helperService.notify('Status Updated', 'Task Status Updated', Enums.messageType.Info);
        this.detail(this.projectId);
      }
    });
  }

  projectEdit() {
    this.router.navigate(['../projects/edit/', this.projectId]);
  }


  projectStatus(statusId: number) {
    this.helperService.get(this.defaultUrl + 'project/' + this.projectId + '/' + statusId).subscribe(result => {
      const abc = result;
      if (result === 0) {
        this.helperService.notify('Completed', 'Project has Successfully been Completed', Enums.messageType.Success);
      } else if (result === 1) {
        this.helperService.notify('Status Updated', 'Project Status Updated', Enums.messageType.Info);
      } else {
        this.helperService.notify('Please ', 'All tasks of this project are not completed', Enums.messageType.Warning);
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


    this.helperService.post(this.CommentUrl + 'save', {
      RecordId: this.projectId,
      ParentId: ParentId,
      Preview: comment,
      RecordType: Enums.Type.Project,
    }).subscribe(result => {
      this.parentComment = null;
      this.childComment = null;
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
    const abc = this.projectId;
    return {
      CommentFilter: {
        RecordId: this.projectId,
        RecordType: Enums.Type.Project
      }
    };
  }



  decideStatus(status: string) {
    return this.appService.checkStatus(status);
  }


  onStatusChange(statusId: number, statusName: string, taskId: number) {
    // this.statusShow = false;
    //  this.statusName = statusName;
    this.appService.checkStatus(statusName);
    this.helperService.get(this.manualTaskURL + 'task/' + taskId + '/' + statusId).subscribe(result => {
      if (result.data === 1) {
        this.helperService.notify(Enums.notificationMessageHeader.updateRecord, Enums.notificationMessageType.updateRecordSuccessfully);
        this.detail(this.projectId);
      } else {
        this.helperService.notify(Enums.notificationMessageHeader.error, Enums.notificationMessageType.ParentTaskNotCompleted,
          Enums.messageType.Error);
        // this.appService.checkStatus(removeCompletedTaskStatus);
      }
    });
  }


  // onStatusChange(statusId: number, statusName: string) {
  //   const removeCompletedTaskStatus = this.statusName;
  //   this.statusName = statusName;
  //   this.appService.checkStatus(statusName);
  //  // this.getRelatedTask(this.taskId);
  //   this.helperService.get(this.manualTaskURL + 'task/' + this.taskId + '/' + statusId).subscribe(result => {
  //     debugger;
  //     if (result.data === 1) {
  //       this.getRelatedTask(this.taskId);
  //       this.helperService.notify(Enums.notificationMessageHeader.updateRecord, Enums.notificationMessageType.
  //        updateRecordSuccessfully);
  //       this.grid(this.completedOrNor);
  //     } else {
  //       this.helperService.notify(Enums.notificationMessageHeader.error, Enums.notificationMessageType.ParentTaskNotCompleted,
  //          Enums.messageType.Error);
  //          this.appService.checkStatus(removeCompletedTaskStatus);
  //     }
  //   });
  // }


  // setCommentParent(parentId: number, event: Event) {
  //   const toggler = event.srcElement.nextElementSibling.nextElementSibling;
  //   if (toggler.className === 'hidden') {
  //     this.issueCommentParentId = parentId;
  //     toggler.className = '';
  //   } else {
  //     toggler.className = 'hidden';
  //   }
  // }


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


  onSearch() {
    const abc = this.tasksList;
    this.tasksList = this.tempTaskList.filter(x => x.statusId == this.selectedStatusId);
  }

  all() {
    this.tasksList = this.tempTaskList2;
  }




  openClickOnSpecificTask(taskId: number) {
    if (taskId > 0) {
      this.showDetailComponent = false;
      this.taskIdOfParentComponent = taskId ;
      setTimeout(() => {
        this.showDetailComponent = true;
   }, 10);
    }
}


// getTaskName(taskName: string) {
// this.taskNameOnPopupHeader = taskName;
// }


  // this.child.ngOnInit();
  // this.counter ++;
  // if (this.counter === 1) {
  // }

  // if ( taskId > 0) {
  // }


}
