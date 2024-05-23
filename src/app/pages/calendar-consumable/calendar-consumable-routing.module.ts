import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConsumableComponent } from './consumable/consumable.component';
import { ConsumablePageComponent } from './consumable-page/consumable-page.component';


const routes: Routes = [
  {
    path: '',
    component: ConsumablePageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class CalendarConsumableRoutingModule {
}
