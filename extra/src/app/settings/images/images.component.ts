import { HelperService } from './../../shared/services/helper.service';
import { Component, OnInit } from '@angular/core';
import * as Enums from '../../shared/services/enum.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {


  AttachmentPathToUpload = Enums.commonURLs.supderAdminAPI + 'attachments/upload';
  uploadProgressBar = false;
  uploadedFiles: any = [];
  ProductId: Number;


  constructor(
    private helperService: HelperService,
  ) { }

  ngOnInit() {}

// First.  the moment a picture is selected
// xml http Request object is get as parameter.
// request is send to api/attachments/upload
// 200 is get in response. and a temp row is added in database.
//   beforeUpload(request) {
//     debugger;
//     this.uploadProgressBar = true;
//     if (this.ProductId !== undefined && this.ProductId > 0) {
//       // In case second image is added.
//       request.formData.append('recordId', this.ProductId);
//     }

//     // add key value pairs in request
//     request.formData.append('recordType', Enums.RecordType.AutoTask);

//     // api need token, so below method will add token to the request
//     this.helperService.addTokenToUploadRequest(request);
//   }


//  // Second. response of beforeupload method request is received here.
//  // Just product id is needed from this resonse
//     onUpload(response) {
//       this.uploadProgressBar = false;

//       // data is array which contain collection of record id, Record Type, Image orignal name, image duet name from database
//       const data = JSON.parse(response.xhr.response);

//      //  Get ProductId from data
//       this.ProductId = data[0].recordId;

//       // data contain. record id, Record Type. Image orignal name, image duet name
//       for (const file of data) {
//         // add objects one by one to the uploadedfiles array.
//         this.uploadedFiles.push(file);
//       }
//      // this.getAttachments();
//     }

























}
