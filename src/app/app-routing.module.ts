import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsyncAwaitComponent } from './async-await/async-await.component';
import { ObservablesComponent } from './observables/observables.component';
import { PromiseComponent } from './promise/promise.component';

const routes: Routes = [
  { path: 'promise', component: PromiseComponent },
  { path: 'observables', component: ObservablesComponent },
  { path: 'asyncAwait', component: AsyncAwaitComponent },
  { path: '', redirectTo: 'promise', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
