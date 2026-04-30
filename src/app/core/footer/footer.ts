import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../../shared/shared-module';

@Component({
    selector: '[app-footer]',
    imports: [SharedModule],
    templateUrl: './footer.html',
    styleUrl: './footer.scss',
})
export class Footer {
    environment = environment;
}
