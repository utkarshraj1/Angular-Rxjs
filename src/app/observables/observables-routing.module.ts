import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AsyncSubjectComponent } from "./async-subject/async-subject.component";
import { ConcatMapComponent } from "./concat-map/concat-map.component";
import { ConcatMergeComponent } from "./concat-merge/concat-merge.component";
import { CustomObservableComponent } from "./custom-observable/custom-observable.component";
import { DebounceComponent } from "./debounce/debounce.component";
import { FilterComponent } from "./filter/filter.component";
import { FromEventComponent } from "./from-event/from-event.component";
import { IntervalComponent } from "./interval/interval.component";
import { ListComponent } from "./list/list.component";
import { MapComponent } from "./map/map.component";
import { MergeMapComponent } from "./merge-map/merge-map.component";
import { OfFromComponent } from "./of-from/of-from.component";
import { PluckComponent } from "./pluck/pluck.component";
import { ReplaySubjectComponent } from "./replay-subject/replay-subject.component";
import { RetryComponent } from "./retry/retry.component";
import { SubjectComponent } from "./subject/subject.component";
import { TakeComponent } from "./take/take.component";
import { TapComponent } from "./tap/tap.component";
import { ToArrayComponent } from "./to-array/to-array.component";

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'from-event', component: FromEventComponent },
    { path: 'interval', component: IntervalComponent },
    { path: 'of-from', component: OfFromComponent },
    { path: 'to-array', component: ToArrayComponent },
    { path: 'custom-observable', component: CustomObservableComponent },
    { path: 'map', component: MapComponent },
    { path: 'pluck', component: PluckComponent },
    { path: 'filter', component: FilterComponent },
    { path: 'tap', component: TapComponent },
    { path: 'take', component: TakeComponent },
    { path: 'retry', component: RetryComponent },
    { path: 'debounce', component: DebounceComponent },
    { path: 'subject', component: SubjectComponent },
    { path: 'replay-subject', component: ReplaySubjectComponent },
    { path: 'async-subject', component: AsyncSubjectComponent },
    { path: 'concat-merge', component: ConcatMergeComponent },
    { path: 'merge-map', component: MergeMapComponent },
    { path: 'concat-map', component: ConcatMapComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ObservablesRoutingModule { }