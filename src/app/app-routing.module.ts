import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewFormComponent } from './view-form/view-form.component';


const routes: Routes = [
  {path: 'viewform', component: ViewFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = ViewFormComponent
