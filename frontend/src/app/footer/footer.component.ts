import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
    selector: 'pa-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true
})
export class FooterComponent {
    environment = environment;
}
