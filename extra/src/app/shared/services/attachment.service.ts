import { Injectable } from '@angular/core';
import * as Enums from '../../shared/services/enum.service';
import { HelperService } from './helper.service';
import { RecordType } from './enum.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AttachmentService {
  uploadedFiles: any;
  attachmentUrl: string;
  attachmentList: any;
  recordId: number;
  recordType: RecordType;
  constructor(private helperService: HelperService) {
    this.uploadedFiles = [];
    this.attachmentUrl = Enums.commonURLs.supderAdminAPI + 'attachments/';

  }
  onUpload(event) {
    this.uploadedFiles = new Array();
    const files = JSON.parse(event.xhr.response);
    this.recordId = files[0].recordId;
    // for (const file of files) {
    //   this.uploadedFiles.push(file);
    // }
  }
  beforeUpload(request, recordType: RecordType) {
    if (this.recordId !== undefined && this.recordId > 0) {
      request.formData.append('recordId', this.recordId);
    }
    request.formData.append('recordType', recordType);
    this.helperService.addTokenToUploadRequest(request);
    this.recordType = recordType;
  }
  uploadError(event) {
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

  getAttachments(): Observable<any> {
    const url = `${this.attachmentUrl}all?id=${this.recordId}&recordType=${this.recordType}`;
    return this.helperService.get(url);
  }
  removeAttachment(attachmentId: number): Observable<any> {
    const url = `${this.attachmentUrl}delete/${attachmentId}`;
    return this.helperService.delete(url);
  }

}
