export type ACTRSimulation = {
    run: any,
    step: any,
    steps: any,
    now: any,
    show_time: any,
}

type ACTRSimulationKwargs = {
    environment?: any,
    realtime?: any,
    trace?: any,
    gui?: any,
    buffers?: any,
    used_productions?: any,
    initial_time?: any,
    environment_process?: any,
}

export type ACTRModel = {
    simulation: {
        callKwargs: (kwargs: ACTRSimulationKwargs) => ACTRSimulation
    },
};
