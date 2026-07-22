/** Provides type definitions for the page-worker interface */

/** Message from the page to the worker */
export interface PageMessage {
    /** id of the simulation */
    id: number;
    /** python script */
    script: string;

    interruptBuffer: Uint8Array
    type: 'start'
}

export type WorkerMessageStatus =
    'loading' | 'starting' | 'complete'  | 'error' | 'stdout' | 'stderr';

/** Message from the worker to the page */
export interface WorkerMessage {
    /** id of the simulation */
    id: number;
    /** type of update */
    status: WorkerMessageStatus;
    /** content of the message */
    value?: any;
}
