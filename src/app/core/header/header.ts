import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Navbar } from '../navbar/navbar';


@Component({
    selector: '[app-header]',
    imports: [Navbar],
    templateUrl: './header.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './header.scss',
})
export class Header {

}
