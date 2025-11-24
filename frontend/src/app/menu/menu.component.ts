import {
    Component
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterModule } from "@angular/router";
import { NgbCollapseModule, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: "pa-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        NgbCollapseModule,
        RouterModule,
        NgbDropdownModule,

    ]
})
export class MenuComponent {
    burgerActive = false;

    toggleBurger() {
        this.burgerActive = !this.burgerActive;
    }
}
