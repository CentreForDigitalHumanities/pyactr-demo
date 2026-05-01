import { ComponentFixture, TestBed } from '@angular/core/testing';

import { About } from './about';
import { SharedTestingModule } from '../../shared/shared-module';

describe('About', () => {
    let component: About;
    let fixture: ComponentFixture<About>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [About, SharedTestingModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(About);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
