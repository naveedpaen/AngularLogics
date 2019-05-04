import { Injectable } from '@angular/core';


@Injectable()
export class EnumService {
  constructor() { }
}

export enum messageType {
  Success = 1,
  Error = 2,
  Warning = 3,
  Info = 4,
  Wait = 5,
  default = 6
}


export enum notificationMessageType {
  deletedSuccessfully = 'Record has been deleted successfully',
  deletedFailed = 'Record could not be deleted',
  deletedFailedAsDifferentUser = 'You are not allowed to delete others Comment.',
  deleteConfirmation = 'Are you sure, you want to delete this record?',
  updateRecordSuccessfully = 'Record has updated successfully',
  updateRecordFailed = 'Record Could Not updated',
  addRecordSuccessfully = 'Record has added successfully',
  addRecordFailed = 'Record could not be saved.',
  loadDataFailed = 'Failed to load data',
  changesSaved = 'Changes saved successfully',
  ParentTaskNotCompleted = 'Parent task is not completed OR You Can not change others task status',
  TaskItemOfOthers = 'You canot update Task Itmes of others.',
  OthersTasksCanotBeDeleted = 'You canot Delete Tasks assigned to others.' ,
  OthersTasksItemsCanotBeDeleted = 'You canot Delete Tasks items assigned to others.'
}

export enum notificationMessageHeader {
  deleteRecord = 'Delete success',
  error = 'Error',
  addRecord = 'Add success',
  updateRecord = 'Update success',
  saveRecord = 'Save success'
}






// Live URLs (Deployment URLs) with https
// export enum commonURLs {
//   supderAdminAPI = 'https://saapi.informanagement.com/api/',
//   baseAppUrl = 'https://pm.informanagement.com/',
//   cdnUrl = 'https://cdn.informanagement.com/Attachments/',
// }
// export enum identitySettings {
//   client_id= 'INFORPM',
//  identityUrl= 'https://accounts.informanagement.com/',
// }




// UAT URLs (Deployment URLs)
// export enum commonURLs {
//   api = 'http://uat-apinet.informanagement.com/api/',
//   supderAdminAPI = 'http://uat-saapi.informanagement.com/api/',
//   baseAppUrl = 'http://uat-pm.informanagement.com/',
//   cdnUrl = 'http://cdn-uat.informanagement.com/Attachments/',
// }
// export enum identitySettings {
//   client_id = 'INFORPM',
//   identityUrl = 'http://accounts-uat.informanagement.com/',
// }


// // Local URLs (Development)
export enum commonURLs {
  baseAppUrl = 'http://uat-pm.informanagement.com:8888/',
    // supderAdminAPI = 'http://current-saapi.informanagement.com/api/',
   supderAdminAPI = 'http://trunk-saapi.informanagement.com/api/',
 // supderAdminAPI = 'http://march-saapi.informanagement.com/api/',
  cdnUrl = 'http://cdn-uat.informanagement.com/Attachments/',
}
export enum identitySettings {
  client_id = 'INFORPM',
  identityUrl = 'http://accounts-uat.informanagement.com/',
}


export enum orderBy {
  ascending = 1,
  descending = -1
}




export enum gridPaginator {
  defaultOrFirstPage = 1,
  defaultPageSize = 10,
}


export enum defaultQryString {
  pageSize = 'ps',
  pageNumber = 'p',
  orderByAsc = 'ob',
  sortColumn = 'sc',
  dateFrom = 'dtf',
  dateTo = 'dtt'
}


export enum pdfGenerationType {
  Single = 1,
  Office = 2,
  Bulk = 3
}

export enum conceptStatus {
  pending = 0,
  Proofing = 1,
  Generating = 2,
  Generated = 3,
  Sending = 4,
  Complete = 5,
  ProofingComplete = 6,
  ReadyToGenerateQueue = 7,
  QueueGenerated = 8,
  ReadyToGenerate = 9
}


export enum conceptType {
  Employee = 1,
  Customer = 2,
  Newsletter = 3,
  CustomerLonen = 4
}


export enum RecordType {
  Issue,
  Task,
  AutoTask,
  Project,
  ManualTask
}

export enum Type {
  Project = 'Project',
  ManualTask = 'ManualTask'
}



