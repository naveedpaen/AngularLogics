import { HelperService } from '../../shared/services/helper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import * as Enums from '../../shared/services/enum.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EditableColumn } from 'primeng/table';
import { ProjectService } from '../projects.service';
import { AppService } from '../../shared/services/app.service';

class Project {
  id: number;
  name: string;
  portalId: number;
  accountantIds: string;
  targetDate: Date;
  completionDate: Date;
  accountManagerId: number;
  templateId: number;
  url: string;
  selectedProductIds: string;
  maintenance: boolean;
  cookiesPolicy: boolean;
  privacyPolicy: boolean;
  description: string;
  statusId: number;
  bringAutotask: boolean;
  EmailLayout: number;

  attachmentsFiles = [];
  projectAttachments = [];
}

class DropDownList {
  id: number;
  name: string;
}


class FormData {
  portals: Array<DropDownList>;
  accountants: Array<DropDownList>;
  assignees: Array<DropDownList>;
  websiteTemplates: Array<any>;
  products: Array<DropDownList>;
  status: Array<DropDownList>;
  constructor(


  ) {
    this.portals = new Array<DropDownList>();
    this.accountants = new Array<DropDownList>();
    this.assignees = new Array<DropDownList>();
    this.websiteTemplates = new Array<any>();
    this.products = new Array<DropDownList>();
    this.status = new Array<DropDownList>();
  }
}
@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  // taskIdOfParentComponent = 1;


  formGroup: FormGroup;
  project: Project;
  defaultUrl = Enums.commonURLs.supderAdminAPI + 'project/';
  attachmentUrl = Enums.commonURLs.supderAdminAPI + 'attachments/';
  formData: FormData;
  attachmentList: any;
  disableAccountantDD = new FormControl(true);
  disableAccountManagerDD = new FormControl(true);
  disableProductDD = new FormControl(true);

  selectedPortalId: number;
  projectId: number;
  showStatus = false;

  // Image Uploader
  uploadedFiles: any[] = [];
  uploadProgress = false;
  uploadUrl = this.attachmentUrl + 'upload';
  showLoader: boolean;
  color = 'warn';
  showWithAdd = false;
  showWithEdit = false;


  EmailLayout: any;
  selectedEmailLayout: number;





  constructor(private formBuilder: FormBuilder,
    private helperService: HelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private porjectService: ProjectService,
    private appService: AppService) {
    this.project = new Project();
    this.formGroup = formBuilder.group({
      name: '',
      portalId: '',
      targetDate: '',
      completionDate: '',
      // accountantId: {value: '', disabled: true},
      accountantIds: { value: [], disabled: true },
      accountManagerId: { value: '', disabled: true },
      selectedProductIds: { value: [], disabled: true },
      templateId: '',
      url: '',
      maintenance: '',
      cookiesPolicy: '',
      privacyPolicy: '',
      description: '',
      statusId: '',
      emailLayout: { value: [], disabled: false },
    });



    this.formData = new FormData();
  }
  ngOnInit() {
    this.load();




    this.activatedRoute.params.subscribe(params => {
      const id = <number>params.id;
      if (id > 0) {
        this.showLoader = true;
        this.showStatus = true;
        this.edit(id);
      } else {
        this.load();
      }
    });

    this.EmailLayout = [
      { id: 1, title: '1' },
      { id: 2, title: '2' },
      { id: 3, title: '3' },
      { id: 4, title: '4' },
      { id: 5, title: '5' },
    ];


  }

  // getTasks() {

  // }


  public add(a: number): number {
    return a + 1;
  }


  load() {
    this.showWithAdd = true;
    this.showWithEdit = false;
    const url = this.defaultUrl + 'formdata';
    this.helperService.get(url).subscribe(result => {
      this.formData.portals = result.portals;
      this.formData.products = result.products;
      this.formData.assignees = result.assignees;
      this.formData.accountants = result.accountants;
      this.formData.status = result.status;
      this.formData.websiteTemplates = this.groupTemplates(
        result.websiteTemplates
      );
    });
  }


  onPortalChange() {
    this.formGroup.get('accountantIds').enable();
    this.formGroup.get('accountManagerId').enable();
    this.formGroup.get('selectedProductIds').enable();
    this.porjectService.OnPortalChange(this.getSelectedValueOf('portalId')).subscribe(
      result => {
        this.formData.products = result.products;
        this.formData.accountants = result.accountants;
        this.formData.assignees = result.assignees;
      });
  }


  getSelectedValueOf(selectedId: string) {
    return this.formGroup.get(selectedId).value;
  }


  groupTemplates(templates: Array<DropDownList>): Array<any> {
    const groups = new Array<any>();
    templates.forEach(t => {
      const groupName = t.name.split(',')[1].trim();
      let group = groups.find(x => x.name === groupName);
      if (group === null || group === undefined) {
        group = { name: groupName, list: new Array<any>() };
        groups.push(group);
      }
      const templateName = t.name.split(',')[0];
      group.list.push({ id: t.id, name: templateName });
    });
    return groups;
  }

  save(project: Project) {
    project.selectedProductIds = project.selectedProductIds.toString();
    project.accountantIds = project.accountantIds.toString();
    project.id = this.projectId;
    //  let projectAttachments: any = [];
    //  const attachmentsFiles: any = [];
    //  if (this.uploadedFiles.length > 0) {
    //    this.uploadedFiles.forEach(file => {
    //      const projectAttachmentsViewModel: any = {
    //       Type: file.recordType,
    //       RecordId: this.projectId,
    //       FileName: file.fileName,
    //       FilePath: file.filePath,
    //       Deleted: false,
    //       DT_Created: file.dT_Created,
    //       DT_Modified: file.dT_Modified
    //      };

    //      // attachmentsFiles.push(this.fileInput.files[i].size);
    //      projectAttachments.push(projectAttachmentsViewModel);
    //    });
    //  } else {
    //    projectAttachments = {
    //     type: '',
    //     recordId: '',
    //     FileName: '',
    //     FilePath: '',
    //     Deleted: '',
    //     DT_Created: '',
    //     DT_Modified: ''
    //   };
    //  }


    //  project.attachmentsFiles = attachmentsFiles;
    //  project.projectAttachments = projectAttachments;
    const url = this.defaultUrl + 'save';
    this.helperService.post(url, project).subscribe(
      result => {
        this.helperService.notify(
          'Success',
          'Keyword added successfully',
          Enums.messageType.Success
        );
        this.router.navigate(['../projects']);
      },
      error => {
        this.helperService.notify('Error', error, Enums.messageType.Error);
      }
    );
    // this.router.navigate(['../projects/allprojects']);
  }



  edit(id: number) {
    this.showWithEdit = true;
    this.showWithAdd = false;
    this.formGroup.get('accountantIds').enable();
    this.formGroup.get('selectedProductIds').enable();
    this.formGroup.get('accountManagerId').enable();
    this.helperService.get(this.defaultUrl + 'edit/' + id).subscribe(result => {
      const res = result.data;
      const res2 = result.result2;
      this.formData.portals = res2.portals;



      // this.formData.products = res2.products;
      // this.formData.assignees = res2.assignees;
      // this.formData.accountants = res2.accountants;
      this.showLoader = false;
      this.attachmentList = res2.attachments;
      this.formGroup = this.formBuilder.group({
        name: res.name,
        portalId: res.portalId,
        accountantIds: res.accountantId,
        targetDate: res.targetDate,
        completionDate: res.completionDate,
        accountManagerId: res.accountManagerId,
        templateId: res.templateId,
        url: res.url,
        selectedProductIds: [res.selectedProductIds.split(',').map(Number)],
        maintenance: [res.maintenance ? '1' : '0'],
        cookiesPolicy: [res.cookiesPolicy ? '1' : '0'],
        privacyPolicy: [res.privacyPolicy ? '1' : '0'],
        description: res.description,
        statusId: res.statusId,
        emailLayout: res.emailLayout,
      });
      this.onPortalChange();
    });
    this.projectId = id;

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
          return false;
        }
      });
  }



  getAttachments() {
    const url = this.attachmentUrl + 'all?id=' + this.projectId + '&recordType=3';
    this.helperService.get(url).subscribe(result => {
      this.attachmentList = result.data;
    });
  }

  getAttachmentPath(attachment: any): string {

    return Enums.commonURLs.cdnUrl + 'projects/'
      + attachment.recordId + '/' + attachment.filePath;
  }



  // file uploading events
  onUpload(event) {
    this.uploadProgress = false;
    this.uploadedFiles = new Array();

    // for (const fileWithGuid of event.xhr.response) {

    //  }

    const files = JSON.parse(event.xhr.response);
    this.projectId = files[0].recordId;
    for (const file of files) {
      this.uploadedFiles.push(file);
    }
    this.getAttachments();

  }
  beforeUpload(request) {
    this.uploadProgress = true;
    // this.SaveData();
    if (this.projectId !== undefined && this.projectId > 0) {

      request.formData.append('recordId', this.projectId);
    }
    request.formData.append('recordType', 3);

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







}

