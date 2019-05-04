import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddComponent } from './add/add.component';
import { LifecycleComponent } from './lifecycle/lifecycle.component';
import { ProductsRoutingModule } from './product-routing.module';
import { ShowComponent } from './show/show.component';
import { ChildlifecycleComponent } from './childlifecycle/childlifecycle.component';

@NgModule({
  declarations: [AddComponent, ShowComponent, LifecycleComponent, ChildlifecycleComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
