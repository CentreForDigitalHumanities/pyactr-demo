import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';

@Component({
    selector: '[app-header]',
    imports: [CommonModule, Navbar],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {

}
