import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutputConsole } from './output-console';
import { TEST_PROVIDERS } from '../../shared/test-providers';

describe('OutputConsole', () => {
    let component: OutputConsole;
    let fixture: ComponentFixture<OutputConsole>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: TEST_PROVIDERS,
            imports: [OutputConsole]
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
