import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared-module';

@Component({
    selector: '[app-navbar]',
    imports: [SharedModule, RouterLink, NgbCollapse],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss',
})
export class Navbar {
    navCollapse = true;
}
