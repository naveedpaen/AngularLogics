import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UtilityService } from "./utility.service";
import { TestComponent } from '../test/test.component';

@NgModule({
  //declarations:[TestComponent],
  providers: [UtilityService],
  //exports:[TestComponent] 
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
          ngModule:SharedModule,
          providers: [UtilityService]
        }
  }


}
