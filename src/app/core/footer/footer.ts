import { Component, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
    selector: '[app-footer]',
    imports: [],
    templateUrl: './footer.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './footer.scss',
})
export class Footer {
    environment = environment;
}
