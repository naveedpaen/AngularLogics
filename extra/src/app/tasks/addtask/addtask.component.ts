import { TaskdetailComponent } from './../taskdetail/taskdetail.component';
import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../shared/services/helper.service';
import * as Enums from '../../shared/services/enum.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../shared/services/app.service';
import { AttachmentService } from '../../shared/services/attachment.service';
import { TasksService } from '../tasks.service';


class AddTask {
  id: number;
  name: string;
  description: string;
  portalId: number;
  accountantId: number;
  startDate: Date;
  targetDate: Date;
  completeDate: Date;
  accountManagerId: number;
  productId: number;
  assignedToId: number;
  priorityId: number;
  statusId: number;
  projectId: number;
  attachmentsFiles: any;
  settingAttachments: any;
  parentId: number;
}

@Component({
  selector: 'app-addsetting',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddTaskComponent implements OnInit {
  manualTaskUrl = Enums.commonURLs.supderAdminAPI + 'tasks/';
  attachmentUrl = Enums.commonURLs.supderAdminAPI + 'attachments/';

  Url = Enums.commonURLs.supderAdminAPI;

  formGroup: FormGroup;

  taskId: number;
  portalList: any;
  projectList: number;
  accountantList: any;
  assignedList: any;
  priorityList: any;
  statusList: any;
  productList: any;

  disableProjectDD = new FormControl(true);
  disableAssignedDD = new FormControl(true);
  disablePriorityDD = new FormControl(true);
  disableStatusDD = new FormControl(true);



  showStatus = false;
  // Image Uploader
  uploadedFiles: any[] = [];
  uploadProgress = false;
  uploadUrl = this.attachmentUrl + 'upload';
  attachmentList: any;
  showLoader = true;
  color = 'warn';



  dependentList: any;
  taskList: any;
  selectedDependend: number;
  showDependent = false;


  //#endregion
  constructor(
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private attachmentService: AttachmentService,
    private router: Router,
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
      projectId: { value: '', disabled: true },
      productId: { value: '', disabled: true },
      assignedToId: { value: '', disabled: true },
      priorityId: { value: '', disabled: true },
      statusId: '',
      selectedYesOrNot: { value: false, disabled: false },
      parentId: { value: '', disabled: true }
    });

    this.dependentList = [
      { id: false, title: 'No' },
      { id: true, title: 'Yes' },
    ];
  }


  ngOnInit() {
    this.load();
    this.activatedRoute.params.subscribe(result => {
      const Id = <number>result.Id;
      if (Id > 0) {
        this.edit(Id);
      } else {
        this.showLoader = false;
      }
    });
  }

  load() {
    this.showStatus = false;

    //   Portal List DropDown
    this.appService.getPortalsList().subscribe(result => {
      this.portalList = result.data;
    });
  }


  onYesOrNoChange() {
    const a = this.getSelectedValueOf('selectedYesOrNot');
    if (a === true) {
      this.showDependent = true;
    } else {
      this.showDependent = false;
      this.formGroup.patchValue({ parentId: null });
    }
  }





  onPortalChange() {
    this.formGroup.get('projectId').enable();
    this.formGroup.get('assignedToId').enable();
    this.formGroup.get('priorityId').enable();
    this.helperService
      .get(this.manualTaskUrl + 'Portal/' + this.getSelectedValueOf('portalId'))
      .subscribe(result => {
        this.projectList = result.data.projectList;
        this.assignedList = result.data.assigneeList;
        this.priorityList = result.data.priorityList;
        this.statusList = result.data.statusList;
        this.productList = result.data.productList;
      });
  }


  onProjectChange() {
    this.formGroup.get('productId').enable();
    this.tasksService.onProjectChange(this.getSelectedValueOf('projectId')).subscribe(result => {
      this.productList = result.data.productList;
    });
  }


  onProductChange() {
    this.formGroup.get('parentId').enable();
    this.tasksService.onProductChange(this.getSelectedValueOf('productId'), this.getSelectedValueOf('projectId')).subscribe(result => {
      this.taskList = result.data;
    });
  }


  getSelectedValueOf(selected: string) {
    return this.formGroup.get(selected).value;
  }


  save(task) {
    const vm: AddTask = new AddTask();
    vm.id = this.taskId;
    vm.name = task.name;
    vm.projectId = task.projectId;
    vm.description = task.description;
    vm.productId = task.productId;
    vm.priorityId = task.priorityId;
    vm.assignedToId = task.assignedToId;
    vm.portalId = task.portalId;
    vm.projectId = task.projectId;
    vm.statusId = 1;
    vm.targetDate = task.targetDate;
    vm.parentId = task.parentId;
    this.appService.save('tasks/save', vm).subscribe(result => {
      if (result) {
        this.helperService.notify(
          Enums.notificationMessageHeader.saveRecord,
          Enums.notificationMessageType.changesSaved
        );
        this.formGroup = this.formBuilder.group({
          id: '',
          name: '',
          description: '',
          startDate: '',
          targetDate: '',
          completeDate: '',
          portalId: '',
          projectId: { value: '', disabled: true },
          productId: { value: '', disabled: true },
          assignedToId: { value: '', disabled: true },
          priorityId: { value: '', disabled: true },
          statusId: '',
          selectedYesOrNot: { value: false, disabled: false },
          parentId: { value: '', disabled: true }
        });
        if (this.taskId > 0) {
          this.router.navigate(['../tasks/']);
        }
        // window.location.reload();
        // this.router.navigate(['../tasks/']);
      }
    });
  }

  edit(id: number) {
    this.taskId = id;
    this.attachmentService.recordId = id;
    this.showStatus = true;
    this.formGroup.get('projectId').enable();
    this.formGroup.get('productId').enable();
    this.formGroup.get('assignedToId').enable();
    this.formGroup.get('priorityId').enable();
    this.helperService.get(this.manualTaskUrl + 'edit/' + id).subscribe(result => {
      this.showLoader = false;
      const data = result.data;
      this.portalList = data.portalList;
      this.assignedList = data.assigneeList;
      this.projectList = data.projectList;
      this.priorityList = data.priorityList;
      this.attachmentList = data.attachmentList;
      this.statusList = data.statusList;
      this.taskList = data.taskList;
      const manual = <AddTask>data.manualTaskList[0];
      this.formGroup = this.formBuilder.group({
        id: manual.id,
        name: manual.name,
        description: manual.description,
        startDate: manual.startDate,
        targetDate: manual.targetDate,
        completeDate: manual.completeDate,
        portalId: manual.portalId,
        projectId: manual.projectId,
        productId: manual.productId,
        assignedToId: manual.assignedToId,
        priorityId: manual.portalId,
        statusId: manual.statusId,
        parentId: manual.parentId,
        selectedYesOrNot: true,
      });

      if (manual.parentId !== 0) {
        this.showDependent = true;
        this.formGroup.get('parentId').enable();
        this.formGroup.patchValue({ selectedYesOrNot: true });
      } else {
        this.formGroup.patchValue({ selectedYesOrNot: false });
      }

      this.onProjectChange();
    });
  }

  getAttachmentPath(attachment: any): string {
    const path = `${Enums.commonURLs.cdnUrl}ManualTasks/${attachment.recordId}/${attachment.filePath}`;
    return path;
  }
  removeAttachment(attachmentId: number) {
    this.attachmentService.removeAttachment(attachmentId).subscribe(response => {
      if (response.success === true) {
        this.helperService.notify(
          Enums.notificationMessageHeader.deleteRecord,
          Enums.notificationMessageType.deletedSuccessfully
        );
        this.getAttachments();
      } else {
        this.helperService.notify(
          Enums.notificationMessageHeader.error,
          Enums.notificationMessageType.deletedFailed,
          Enums.messageType.Error
        );
      }
    });
  }

  // or
  getAttachments() {
    this.attachmentList = this.attachmentService.getAttachments().subscribe(result => {
      this.attachmentList = result.data;
    });
  }

  // getAttachments() {
  //   const url =
  //     this.attachmentUrl + 'all?id=' + this.taskId + '&recordType=3';
  //   this.helperService.get(url).subscribe(result => {
  //     this.attachmentList = result.data;
  //   });
  // }

  // getAttachments() {
  //   const url = this.attachmentUrl + 'all?id=' + this.projectId + '&recordType=3';
  //   this.helperService.get(url).subscribe(result => {
  //     this.attachmentList = result.data;
  //   });
  // }


  // task orignal
  onUpload(event) {
    this.uploadProgress = false;
    this.attachmentService.onUpload(event);
    this.uploadedFiles = this.attachmentService.uploadedFiles;
    this.taskId = this.attachmentService.recordId;
    this.getAttachments();
  }


  // onUpload(event) {
  //   this.uploadProgress = false;
  //   this.uploadedFiles = new Array();
  //   const files = JSON.parse(event.xhr.response);
  //   this.taskId = files[0].recordId;
  //   this.getAttachments();
  // }



  beforeUpload(request) {
    this.uploadProgress = true;
    this.attachmentService.beforeUpload(
      request,
      Enums.RecordType.ManualTask
    );
  }
  uploadError(event) {
    this.attachmentService.uploadError(event);
  }






}
