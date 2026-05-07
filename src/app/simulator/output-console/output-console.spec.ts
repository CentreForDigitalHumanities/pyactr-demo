import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutputConsole } from './output-console';
import { SharedTestingModule } from '../../shared/shared-module';

describe('OutputConsole', () => {
    let component: OutputConsole;
    let fixture: ComponentFixture<OutputConsole>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OutputConsole, SharedTestingModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(OutputConsole);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('console', []);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
