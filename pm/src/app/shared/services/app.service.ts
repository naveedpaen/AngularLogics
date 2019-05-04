import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import * as Enums from './enum.service';
import { Observable } from '../../../../node_modules/rxjs';



@Injectable()
export class AppService {

    defaultURL = Enums.commonURLs.supderAdminAPI;
    ManualTaskURL = Enums.commonURLs.supderAdminAPI + 'tasks/';


    constructor(private helperService: HelperService) {
    }




    // Project, Assignee, priority, status, product Lists
    OnPortalChange(portalId: number): Observable<any> {
        return this.helperService.get(this.ManualTaskURL + 'portal/' + portalId);
    }


    getPortalsList(): Observable<any> {
        return this.helperService.get(this.defaultURL + 'settings/portals');
    }


    paged(path: string, pageRequest: any): Observable<any> {
        return this.helperService.post(this.defaultURL + path, pageRequest);
    }


    save(path: string, anyObject: any): Observable<any> {
        return this.helperService.post(this.defaultURL + path, anyObject);
    }


    // in path provide Controller and action method path.
    delete(path: string, id: number): Observable<any> {
        return this.helperService.delete(this.defaultURL + path + id);
    }

       // in path provide Controller and action method path.
    //    commonDelete(path: string , id: string): Observable<any> {
    //     return this.helperService.delete(this.defaultURL + path + id);
    // }






    checkStatus(status: string) {
        const returnCSS = 'badge badge-';
        if (status === 'Delay') {
            return returnCSS + 'danger';
        } else if (status === 'In Progress') {
            return returnCSS + 'primary';
        } else if (status === 'Completed') {
            return returnCSS + 'success';
        } else if (status === 'To Do') {
            return returnCSS + 'info';
        }
    }


    checkFlag(flagName: string) {
        const contantPart = '../../../assets/images/';
        if (flagName === 'United Kingdom') {
            return contantPart + 'uk.png';
        } else if (flagName === 'Germany') {
            return contantPart + 'germany.png';
        } else if (flagName === 'Netherlands') {
            return contantPart + 'netherland.ico';
        }
    }


    decideFlag(portalId: Number) {
        const contantPart = '../../../assets/images/';
        if (portalId === 2) {
            return contantPart + 'uk.png';
        } else if (portalId === 1) {
            return contantPart + 'netherland.ico';
        } else if (portalId === 3) {
            return contantPart + 'germany.png';
        }
    }

    decidePriority(PriorityName: string) {
        const contantPart = '../../../assets/images/';
        if (PriorityName === 'High') {
            return contantPart + 'uk.png';
        } else if (PriorityName === 'Medium') {
            return contantPart + 'germany.png';
        } else if (PriorityName === 'Low') {
            return contantPart + 'netherland.ico';
        }
    }

    getRelatedTasks(taskId: number) {
        return this.helperService.get(this.ManualTaskURL + 'relatedTask/' + taskId);
    }


    StatusList() {
        return [
            { id: 1, name: 'To Do' },
            { id: 2, name: 'In Progress' },
            { id: 3, name: 'Delay' },
            { id: 4, name: 'Completed' },
        ];
       // return values;
    }


    decideDependentLinkCSS( parentName: string ) {
        if (parentName !== 'null') {
          return 'clickable_task';
        } else {
          return 'no_task';
        }
      }


      getTaskItems(taskId: Number) {
          return   this.helperService.get(this.ManualTaskURL + 'items/' + taskId);
      }




}
