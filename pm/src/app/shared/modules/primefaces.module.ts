import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TreeviewModule } from 'ngx-treeview';
import {PickListModule} from 'primeng/picklist';


import {
    PaginatorModule, AccordionModule, DataTableModule,
    SharedModule, DialogModule, EditorModule,
    ChipsModule, LazyLoadEvent , FileUploadModule,
   CalendarModule,  SidebarModule, ContextMenuModule, LightboxModule, PanelModule,
} from 'primeng/primeng';
import {DragDropModule} from 'primeng/dragdrop';


import {TreeModule} from 'primeng/tree';
import {TreeNode, ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TableModule} from 'primeng/table';
import { ScrollPanelModule } from 'primeng/components/scrollpanel/scrollpanel';
import {ListboxModule} from 'primeng/listbox';

@NgModule({
imports: [PickListModule, PaginatorModule, AccordionModule, DataTableModule,
   SharedModule, DialogModule, EditorModule, BrowserModule, FormsModule, ChipsModule,
    FileUploadModule,  TreeModule, ConfirmDialogModule, CalendarModule, PanelModule,
    TableModule , TreeviewModule, ScrollPanelModule, ListboxModule, SidebarModule, ContextMenuModule, LightboxModule, DragDropModule],

exports: [PickListModule, PaginatorModule, AccordionModule, DataTableModule, TableModule,
    SharedModule, DialogModule, EditorModule, BrowserModule, FormsModule,
     ChipsModule, FileUploadModule, TreeModule,  ConfirmDialogModule, PanelModule,
     CalendarModule , TreeviewModule, ScrollPanelModule, ListboxModule, SidebarModule, ContextMenuModule, LightboxModule, DragDropModule],
providers: [ConfirmationService]
})

export class PrimeFacesModule {

}
