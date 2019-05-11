import { HelperModule } from './../shared//helper/helper.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddComponent } from './add/add.component';
import { LifecycleComponent } from './lifecycle/lifecycle.component';
import { ProductsRoutingModule } from './product-routing.module';
import { ShowComponent } from './show/show.component';
import { ChildlifecycleComponent } from './childlifecycle/childlifecycle.component';
import { BindingComponent } from './binding/binding.component';

@NgModule({
  declarations: [AddComponent, ShowComponent, LifecycleComponent, ChildlifecycleComponent, BindingComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HelperModule
  ]
})
export class ProductsModule { }
