import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { ShowComponent } from './show/show.component';
import { LifecycleComponent } from './lifecycle/lifecycle.component';


const productRoutes: Routes = [
    {
        path: 'pro', children: [
            { path: 'add', component: AddComponent },
            { path: 'show', component: ShowComponent },
            { path: 'lc', component: LifecycleComponent }

        ]
    }
];


@NgModule({
    imports: [
        RouterModule.forChild(productRoutes)]
})



export class ProductsRoutingModule { }
