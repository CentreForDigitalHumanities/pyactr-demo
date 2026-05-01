import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputConsole } from './output-console';
import { Simulation } from '../simulation';

describe('OutputConsole', () => {
  let component: OutputConsole;
  let fixture: ComponentFixture<OutputConsole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputConsole, Simulation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputConsole);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
