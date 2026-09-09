import { TestBed } from '@angular/core/testing';

import { Simulation, SimulationManager } from './simulation-manager';
import { PythonMock } from '../shared/python-mock';
import { Python } from '../shared/python';
import { TEST_PROVIDERS } from '../shared/test-providers';

const dummyScript = `print('Hello world!')\n`;

describe('Simulation', () => {
    let python: Python;
    let simulation: Simulation;

    beforeEach(() => {
        python = new PythonMock() as any as Python;
        simulation = new Simulation(python, dummyScript);
    });

    it('messages the worker on start', () => {
        const spy = spyOn(python, 'postMessage');
        simulation.start();
        expect(spy).toHaveBeenCalled();
    });

    it('forwards console output', () => {
        simulation.start();
        python.workerMessage$.next({
            id: simulation.id,
            status: 'stdout',
            value: 'a'
        });
        python.workerMessage$.next({
            id: simulation.id,
            status: 'stdout',
            value: 'b'
        });
        python.workerMessage$.next({
            id: simulation.id,
            status: 'stderr',
            value: 'c'
        });
        expect(simulation.scriptConsole()).toEqual([
            { type: 'out', value: 'a' },
            { type: 'out', value: 'b' },
            { type: 'err', value: 'c' }
        ]);
    });

    it('stops listening after the script completes', () => {
        simulation.start();
        python.workerMessage$.next({
            id: simulation.id,
            status: 'starting',
        });
        python.workerMessage$.next({
            id: simulation.id,
            status: 'stdout',
            value: 'a'
        });
        python.workerMessage$.next({
            id: simulation.id,
            status: 'complete',
        });
        // The worker sends another message the "complete" message.
        // Should never happen; this is just to verify that we don't leave an open
        // subscription.
        python.workerMessage$.next({
            id: simulation.id,
            status: 'stdout',
            value: 'b'
        });
        // Second message should not be received.
        expect(simulation.scriptConsole()).toEqual([
            { type: 'out', value: 'a' },
        ]);
    });

    it('splits script output and simulation output', () => {
        simulation.start();
        python.workerMessage$.next({
            id: simulation.id,
            status: 'starting',
        });
        python.workerMessage$.next({
            id: simulation.id,
            status: 'stdout',
            value: 'a'
        });
        python.workerMessage$.next({
            id: simulation.id,
            status: 'complete',
            value: true,
        });
        python.workerMessage$.next({
            id: simulation.id,
            status: 'stdout',
            value: 'b'
        });
        expect(simulation.scriptConsole()).toEqual([
            { type: 'out', value: 'a' },
        ]);
        expect(simulation.stepperConsole()).toEqual([
            { type: 'out', value: 'b'}
        ]);

    });

    describe('error states', () => {
        it('sets loading_error', () => {
            simulation.start();
            python.workerMessage$.next({
                id: simulation.id,
                status: 'error',
                value: { message: 'test' }
            });
            expect(simulation.status$.value).toEqual({ stage: 'loading', status: 'error'});
        });

        it('sets script_error', () => {
            simulation.start();
            python.workerMessage$.next({
                id: simulation.id,
                status: 'starting',
            });
            python.workerMessage$.next({
                id: simulation.id,
                status: 'error',
                value: { message: 'test' }
            });
            expect(simulation.status$.value).toEqual({ stage: 'script', status: 'error'});
        });

        it('sets stepper_error', () => {
            simulation.start();
            python.workerMessage$.next({
                id: simulation.id,
                status: 'starting',
            });
            python.workerMessage$.next({
                id: simulation.id,
                status: 'complete',
                value: true,
            });
            python.workerMessage$.next({
                id: simulation.id,
                status: 'error',
                value: { message: 'test' }
            });
            expect(simulation.status$.value).toEqual({ stage: 'stepper', status: 'error'});
        });
    });

    describe('stop', () => {
        it('calls Python.stop', () => {
            const spy = spyOn(python, 'stop');
            simulation.start();
            simulation.stop();
            expect(spy).toHaveBeenCalled();
        });

        it('sets status loading_interrupt', () => {
            simulation.start();
            simulation.stop();
            expect(simulation.status$.value).toEqual({ stage: 'loading', status: 'interrupt'});
        });

        it('sets status script_interrupt', () => {
            simulation.start();
            python.workerMessage$.next({
                id: simulation.id,
                status: 'starting',
            });
            simulation.stop();
            expect(simulation.status$.value).toEqual({ stage: 'script', status: 'interrupt'});
        });

        it('sets status stepper_interrupt', () => {
            simulation.start();
            python.workerMessage$.next({
                id: simulation.id,
                status: 'starting',
            });
            python.workerMessage$.next({
                id: simulation.id,
                status: 'complete',
                value: true,
            });
            simulation.stop();
            expect(simulation.status$.value).toEqual({ stage: 'stepper', status: 'interrupt'});
        });
    });
});

describe('SimulationManager', () => {
    let python: Python;
    let service: SimulationManager;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [...TEST_PROVIDERS, SimulationManager],
        });
        python = TestBed.inject(Python);
        service = TestBed.inject(SimulationManager);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('runs simulations', () => {
        const spy = spyOn(python, 'postMessage');
        service.run(dummyScript);
        expect(spy).toHaveBeenCalled();
    });
});
