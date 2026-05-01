import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared-module';

@Component({
    selector: 'app-examples',
    imports: [SharedModule],
    templateUrl: './examples.html',
    styleUrl: './examples.scss',
})
export class Examples {

}
