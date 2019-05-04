import { debug } from 'util';
import { Observable } from 'rxjs';
import { HelperService } from '../../shared/services/helper.service';
import { Component, OnInit } from '@angular/core';
import * as Enums from '../../shared/services/enum.service';
import { IAddSettingViewModel } from './addsetting_viewmodel';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { AddSettingService } from './addsetting.service';
import { AppService } from '../../shared/services/app.service';

export class AddSetting {
  id: number;
  name: string;
  description: string;
  portalId: number;
  productId: number;
  assignedToId: number;
  priorityId: number;
  dependOn: boolean;
  parentId: number;
}

@Component({
  selector: 'app-addsetting',
  templateUrl: './addsetting.component.html',
  styleUrls: ['./addsetting.component.css']
})
export class AddsettingComponent implements OnInit {
  //#region Variables
  defaultUrl = Enums.commonURLs.supderAdminAPI + 'settings/';
  attachmentUrl = Enums.commonURLs.supderAdminAPI + 'attachments/';
  superAdminUrl = Enums.commonURLs.supderAdminAPI;
  formGroup: FormGroup;

  portalList: any;
  attachmentList: any;
  productList: any;
  priorityList: any;
  AssignToList: number;
  saveDescription: string;
  saveTask: string;
  autoTaskId: number;
  content: '<p>Red and blue color logo should be created.</p>';
  id2: number;
  showLoader: boolean;
  color = 'warn';

  // Image Uploader
  uploadedFiles: any[] = [];
  uploadProgress = false;
  uploadUrl = this.attachmentUrl + 'upload';


  dependentList: any;
  showDependent = false;
  taskList: any;
  course: any;


  //#endregion
  constructor(
    private helperService: HelperService,
    private activatedRoute: ActivatedRoute,
    private addsettingservice: AddSettingService,
    private router: Router,
    private formBuilder: FormBuilder,
    private appService: AppService
  ) {
    this.formGroup = this.formBuilder.group({
      id: '',
      Name: '',
      Description: '',
      PortalId: '',
      ProductId: { value: '', disabled: true },
      AssignedToId: { value: '', disabled: true },
      PriorityId: { value: '', disabled: true },
      selectedYesOrNot: { value: false, disabled: false },
      ParentId: { value: '', disabled: true }
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = <number>params.id;
      if (id > 0) {
        this.edit(id);
        this.showLoader = true;
      } else {
        this.load();
      }
    });



    this.dependentList = [
      { id: false, title: 'No' },
      { id: true, title: 'Yes' },
    ];

  }

  load() {
    this.helperService
      .get(this.superAdminUrl + 'issue/formdata')
      .subscribe(result => {
        this.portalList = result.data.portalList;
        this.priorityList = result.data.priorityList;
        this.productList = result.data.projectList;
        this.AssignToList = result.data.assigneeList;
      });
  }

  onPortalChange() {
    this.formGroup.get('ProductId').enable();
    this.formGroup.get('AssignedToId').enable();
    this.formGroup.get('PriorityId').enable();

    this.helperService
      .get(this.defaultUrl + 'Portal/' + this.getSelectedValueOf('PortalId'))
      .subscribe(result => {
        this.productList = result.data.productList;
        this.AssignToList = result.data.assigneeList;
      });
  }


  save(settings) {
    // let settingAttachments: any = [];
    // const attachmentsFiles: any = [];
    // if (this.uploadedFiles.length > 0) {
    //   this.uploadedFiles.forEach(file => {
    //     const settingAttachmentsViewModel: any = {
    //       // id: this.autoTaskId,
    //       type: file.recordType,
    //       recordId: this.autoTaskId,
    //       FileName: file.fileName,
    //       FilePath: file.filePath,
    //       Deleted: false,
    //       DT_Created: file.dT_Created,
    //       DT_Modified: file.dT_Modified
    //     };
    //     settingAttachments.push(settingAttachmentsViewModel);
    //   });
    // } else {
    //   settingAttachments = {
    //     // id: '',
    //     type: '',
    //     recordId: '',
    //     FileName: '',
    //     FilePath: '',
    //     Deleted: '',
    //     DT_Created: '',
    //     DT_Modified: ''
    //   };
    // }
    const vm = new IAddSettingViewModel();
    vm.Id = this.autoTaskId;
    vm.Name = settings.Name;
    vm.Description = settings.Description;
    vm.ProductId = settings.ProductId;
    vm.PriorityId = settings.PriorityId;
    vm.AssignedToId = settings.AssignedToId;
    vm.PortalId = settings.PortalId;
    // vm.depend = settings.selectedYesOrNot;
    vm.ParentId = settings.ParentId;
    // vm.AttachmentsFiles = attachmentsFiles;
    // vm.settingAttachments = settingAttachments;

    this.appService.save('settings/save', vm).subscribe(result => {
      if (result) {
        this.helperService.notify(
          Enums.notificationMessageHeader.saveRecord,
          Enums.notificationMessageType.changesSaved
        );
        // this.formGroup = this.formBuilder.group({
        //   id: '',
        //   Name: '',
        //   Description: '',
        //   PortalId: '',
        //   ProductId: { value: '', disabled: true },
        //   AssignedToId: { value: '', disabled: true },
        //   PriorityId: { value: '', disabled: true },
        //   selectedYesOrNot: {value: false , disabled: false},
        //   ParentId: {value: '', disabled: true}
        // });
        this.router.navigate(['../settings']);
      }
    });
  }





  getSelectedValueOf(selected: string) {
    return this.formGroup.get(selected).value;
  }

  cleanTextBoxes() {
    this.formGroup.reset();
    this.load();

  }

  removeAttachment(attachmentId: number) {
    return this.helperService
      .delete(`${this.attachmentUrl}delete/${attachmentId}`)
      .subscribe(response => {
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

  getAttachments() {
    const url =
      this.attachmentUrl + 'all?id=' + this.autoTaskId + '&recordType=2';
    this.helperService.get(url).subscribe(result => {
      this.attachmentList = result.data;
    });
  }

  getAttachmentPath(attachment: any): string {
    return (
      Enums.commonURLs.cdnUrl + 'autotasks/' +
      attachment.recordId +
      '/' +
      attachment.filePath
    );
  }


  edit(id: number) {
    this.autoTaskId = id;
    this.formGroup.get('ProductId').enable();
    this.formGroup.get('AssignedToId').enable();
    this.formGroup.get('PriorityId').enable();
    this.helperService.get(this.defaultUrl + 'edit/' + id).subscribe(result => {
      this.showLoader = false;
      this.AssignToList = result.data.assigneeList;
      this.portalList = result.data.portalList;
      this.productList = result.data.productList;
      this.priorityList = result.data.priorityList;
      this.taskList = result.data.taskList;
      this.attachmentList = result.data.attachmentList;


      const autoTaskList = <AddSetting>result.data.autoTaskList[0];

      this.formGroup = this.formBuilder.group({
        id: autoTaskList.id,
        Name: autoTaskList.name,
        Description: autoTaskList.description,
        PortalId: autoTaskList.portalId,
        ProductId: autoTaskList.productId,
        AssignedToId: autoTaskList.assignedToId,
        PriorityId: autoTaskList.priorityId,
        selectedYesOrNot: true,
        ParentId: autoTaskList.parentId,
      });
      if (result.data.autoTaskList[0].parentId !== 0) {
        this.showDependent = true;
        this.formGroup.patchValue({ selectedYesOrNot: true });
        this.formGroup.get('ParentId').enable();
      } else {
        this.formGroup.patchValue({ selectedYesOrNot: false });
      }

    });
  }

  // file uploading events
  onUpload(event) {
    this.uploadProgress = false;
    this.uploadedFiles = new Array();
    const files = JSON.parse(event.xhr.response);
    this.autoTaskId = files[0].recordId;
    // for (const file of files) {
    //    this.uploadedFiles.push(file);
    // }
    this.getAttachments();
  }



  beforeUpload(request) {
    this.uploadProgress = true;
    // this.SaveData();
    if (this.autoTaskId !== undefined && this.autoTaskId > 0) {
      request.formData.append('recordId', this.autoTaskId);
    }
    request.formData.append('recordType', Enums.RecordType.AutoTask);
    // request = {'id': 1};
    this.helperService.addTokenToUploadRequest(request);
  }



  uploadError(event) {
    this.uploadProgress = false;
    let failedFiles = '';
    for (const file of event.files) {
      this.uploadedFiles.push(file);
      failedFiles += file.name + ', ';
    }
    this.helperService.notify(
      Enums.notificationMessageHeader.error,
      'Uploading failed.' + failedFiles,
      Enums.messageType.Error
    );
  }

  onUploadHandler(event) { }






  onYesOrNoChange() {
    const a = this.getSelectedValueOf('selectedYesOrNot');
    if (a === true) {
      this.showDependent = true;
    } else {
      this.showDependent = false;
      this.formGroup.patchValue({ ParentId: null });
    }
  }



  // get task list on base of portal and Product id
  onProductChange() {
    this.formGroup.get('ParentId').enable();
    const a = this.getSelectedValueOf('PortalId');
    const b = this.getSelectedValueOf('ProductId');
    this.helperService.get(this.defaultUrl + 'product/' + this.getSelectedValueOf('ProductId') + '/' +
      this.getSelectedValueOf('PortalId')).subscribe(result => {
        this.taskList = result.data;
      });
  }








}
