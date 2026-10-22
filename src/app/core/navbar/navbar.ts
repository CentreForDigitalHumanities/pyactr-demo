import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: '[app-navbar]',
    imports: [RouterLink, RouterLinkActive, NgbCollapse],
    templateUrl: './navbar.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './navbar.scss',
})
export class Navbar {
    navCollapse = true;
}
