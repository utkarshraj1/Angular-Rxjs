import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AsyncSubjectComponent } from "./async-subject/async-subject.component";
import { ChunkAComponent } from "./async-subject/chunk-a/chunk-a.component";
import { ChunkBComponent } from "./async-subject/chunk-b/chunk-b.component";
import { CustomObservableComponent } from "./custom-observable/custom-observable.component";
import { DebounceComponent } from "./debounce/debounce.component";
import { FilterComponent } from "./filter/filter.component";
import { FromEventComponent } from "./from-event/from-event.component";
import { IntervalComponent } from "./interval/interval.component";
import { ListComponent } from "./list/list.component";
import { MapComponent } from "./map/map.component";
import { ObservablesRoutingModule } from "./observables-routing.module";
import { ObservablesComponent } from "./observables.component";
import { OfFromComponent } from "./of-from/of-from.component";
import { PluckComponent } from "./pluck/pluck.component";
import { AChildComponent } from "./replay-subject/a-child/a-child.component";
import { BChildComponent } from "./replay-subject/b-child/b-child.component";
import { ReplaySubjectComponent } from "./replay-subject/replay-subject.component";
import { RetryComponent } from "./retry/retry.component";
import { ChildAComponent } from "./subject/child-a/child-a.component";
import { ChildBComponent } from "./subject/child-b/child-b.component";
import { SubjectComponent } from "./subject/subject.component";
import { TakeComponent } from "./take/take.component";
import { TapComponent } from "./tap/tap.component";
import { ToArrayComponent } from "./to-array/to-array.component";
import { ConcatMergeComponent } from './concat-merge/concat-merge.component';

@NgModule({
    declarations: [
        ObservablesComponent,
        ListComponent,
        FromEventComponent,
        IntervalComponent,
        OfFromComponent,
        ToArrayComponent,
        CustomObservableComponent,
        MapComponent,
        PluckComponent,
        FilterComponent,
        TapComponent,
        TakeComponent,
        RetryComponent,
        DebounceComponent,
        SubjectComponent,
        ChildAComponent,
        ChildBComponent,
        ReplaySubjectComponent,
        AChildComponent,
        BChildComponent,
        AsyncSubjectComponent,
        ChunkAComponent,
        ChunkBComponent,
        ConcatMergeComponent
    ],
    imports: [
        CommonModule,
        ObservablesRoutingModule,
        NgbModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
})
export class ObservablesModule { }