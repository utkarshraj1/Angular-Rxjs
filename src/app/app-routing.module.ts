import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsyncAwaitComponent } from './async-await/async-await.component';
import { FromEventComponent } from './observables/from-event/from-event.component';
import { ListComponent } from './observables/list/list.component';
import { ObservablesComponent } from './observables/observables.component';
import { PromiseComponent } from './promise/promise.component';

const routes: Routes = [
  { path: 'promise', component: PromiseComponent },
  {
    path: 'observables', component: ObservablesComponent, children: [
      { path: '', component: ListComponent },
      { path: 'from-event', component: FromEventComponent }
    ]
  },
  { path: 'asyncAwait', component: AsyncAwaitComponent },
  { path: '', redirectTo: 'promise', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
