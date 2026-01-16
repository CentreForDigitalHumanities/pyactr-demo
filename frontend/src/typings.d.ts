type PyodideAPI = {
    async loadPackage: (names: string | string[], options?) => void;
    pyimport: (mode_name) => any;
    runPython: (code, options?) => any;
    runPythonAsync: (code, options?) => any;
    setStdin: (options?) => any;
    setStdout: (options?) => any;
    setStderr: (options?) => any;
};

declare var loadPyodide: (options={}) => Promise<PyodideAPI>;
