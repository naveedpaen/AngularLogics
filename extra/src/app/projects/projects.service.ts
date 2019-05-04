import { HelperService } from '../shared/services/helper.service';
import * as Enums from '../shared/services/enum.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';



@Injectable()
export class ProjectService {
    defaultURL = Enums.commonURLs.supderAdminAPI + 'project/';

constructor (private helperService: HelperService) {

}


// Return Projects & Accountants List
OnPortalChange (portalId: number): Observable <any> {
return this.helperService.get(this.defaultURL + 'portal/' + portalId);
}


onAccountantChange(accountantId: number) {
 return this.helperService.get(this.defaultURL + 'accountant/' + accountantId);
}


}
