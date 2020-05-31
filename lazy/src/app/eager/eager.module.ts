import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EagerService } from "./eager.service";
import { EagerComponent } from "./eager/eager.component";
import { EagerRoutingModule } from "./eager-routing.module";
import { UtilityService } from '../shared/utility.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, EagerRoutingModule, SharedModule],
  declarations: [EagerComponent],
 //  providers: [UtilityService],

})
export class EagerModule {}
