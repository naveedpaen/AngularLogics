// import { Observable } from '../../../../node_modules/rxjs/Observable';
import { HelperService } from '../shared/services/helper.service';
import * as Enums from '../shared/services/enum.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';



@Injectable()
export class SettingService {
defaultURL = Enums.commonURLs.supderAdminAPI + 'settings/';


constructor(private helperService: HelperService) {}

// return product AND Assignee LIst
onPortalChange (portalId: number): Observable <any> {
return this.helperService.get(this.defaultURL + 'portal/' + portalId);
}





}
