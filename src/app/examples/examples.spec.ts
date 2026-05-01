import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Examples } from './examples';
import { SharedTestingModule } from '../shared/shared-module';

describe('Examples', () => {
    let component: Examples;
    let fixture: ComponentFixture<Examples>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Examples, SharedTestingModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Examples);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
