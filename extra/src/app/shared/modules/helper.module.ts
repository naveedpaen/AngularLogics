import { NgModule } from '@angular/core';
import { ToastData, ToastOptions, ToastyConfig, ToastyModule, ToastyService } from 'ng2-toasty';
import { Configuration } from '../configurations/app.configurations';
import { AppService } from '../services/app.service';
import { EnumService } from '../services/enum.service';
import { NotificationService } from '../services/notification.service';
import { TaskdetailComponent } from './../../tasks/taskdetail/taskdetail.component';
import { MaterialModule } from './material.module';
import { PrimeFacesModule } from './primefaces.module';

@NgModule({
     declarations: [TaskdetailComponent],
    imports: [ToastyModule, PrimeFacesModule, MaterialModule],
    exports: [  ToastyModule, PrimeFacesModule, MaterialModule, TaskdetailComponent],
    providers: [NotificationService, ToastyService, ToastyConfig, ToastOptions, ToastData,
        Configuration, EnumService, AppService],
})

export class HelperModule {

}
