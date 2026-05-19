import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
    selector: '[app-navbar]',
    imports: [CommonModule, RouterLink, RouterLinkActive, NgbCollapse],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss',
})
export class Navbar {
    navCollapse = true;
}
