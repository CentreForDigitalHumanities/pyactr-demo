import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
    selector: '[app-footer]',
    imports: [CommonModule],
    templateUrl: './footer.html',
    styleUrl: './footer.scss',
})
export class Footer {
    environment = environment;
}
