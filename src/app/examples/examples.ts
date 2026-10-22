import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterLink } from "@angular/router";
import { exampleID, exampleScripts } from '../shared/examplelist';

@Component({
    selector: 'app-examples',
    imports: [RouterLink],
    templateUrl: './examples.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './examples.scss'
})
export class Examples {
    exampleScripts = exampleScripts;
    exampleID = exampleID;

}
