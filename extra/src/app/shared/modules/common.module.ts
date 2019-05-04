import { PrimeFacesModule } from './primefaces.module';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { ProjectdetailComponent } from '../../projects/projectdetail/projectdetail.component';

@NgModule({
 declarations: [ ],
 imports: [MaterialModule , PrimeFacesModule],
 exports: []
})


export class CommonModule {

}
