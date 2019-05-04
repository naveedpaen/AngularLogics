import { HelperService } from '../../shared/services/helper.service';
import { Injectable } from '@angular/core';
import * as Enums from '../../shared/services/enum.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AddSettingService {

    defaultURL = Enums.commonURLs.supderAdminAPI + 'settings/' ;


constructor(private helperservice: HelperService) { }

getAutotaskById (id: number  ): Observable < any> {
    return this.helperservice.get(this.defaultURL + 'id/' + id );
}






}
