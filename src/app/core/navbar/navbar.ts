import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: '[app-navbar]',
    imports: [RouterLink, NgbCollapse],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss',
})
export class Navbar {
    navCollapse = true;
}
