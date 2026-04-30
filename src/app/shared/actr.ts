const importPyactrSnippet = `
import pyactr as actr
`;


export const importPyactr = (pyodide: PyodideAPI) => {
    const ignore = () => null;
    pyodide.setStdout({batched: ignore});
    pyodide.setStderr({batched: ignore});
    pyodide.runPython(importPyactrSnippet);
}
