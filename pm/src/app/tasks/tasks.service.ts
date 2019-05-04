import { HelperService } from '../shared/services/helper.service';
import * as Enums from '../shared/services/enum.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';



@Injectable()
export class TasksService {
    defaultURL = Enums.commonURLs.supderAdminAPI + 'tasks/';
    ProjectURL = Enums.commonURLs.supderAdminAPI;

constructor (private helperService: HelperService) {

}


// Return Projects & Accountants List
// OnPortalChange (portalId: number): Observable <any> {
// return this.helperService.get(this.defaultURL + 'portal/' + portalId);
// }


// return Projects Lists on Accountant Change
onAccountantChange(accountantId: number) {
 return this.helperService.get(this.ProjectURL + 'project/accountant/' + accountantId);
}



// Return Products list on Project change.
onProjectChange(projectId: number) {
return this.helperService.get(this.defaultURL + 'project/' + projectId);
}


// Return task list on product change.
onProductChange(productId: number, projectid: number) {
    return this.helperService.get(this.defaultURL + 'product/' + productId + '/' + projectid);
    }


    // getRelatedTasks(taskId: number) {
    //  return    this.helperService.get(this.defaultURL + 'relatedTask/' + taskId );
    //  }


}
