import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { Navbar } from '../navbar/navbar';

@Component({
    selector: '[app-header]',
    imports: [SharedModule, Navbar],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {

}
