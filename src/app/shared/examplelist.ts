export interface ExampleScript {
    name: string,
    filename: string,
}


export const exampleID = (example: ExampleScript): string =>
    example.filename.slice(0, example.filename.lastIndexOf('.'));


export const getExample = (examples: ExampleScript[], id: string): ExampleScript | undefined =>
    examples.find(example => example.filename == id + '.py');


export const exampleScripts: ExampleScript[] = [
    {name : "Unit 1 - Addition", filename : "u1_addition.py"},
    {name : "Unit 1 - Count", filename : "u1_count.py"},
    {name : "Unit 1 - Semantic", filename : "u1_semantic.py"},
    {name : "Unit 2 - Demo", filename : "u2_demo.py"},
    {name : "Unit 3 - Multiple Objects", filename : "u3_multiple_objects.py"},
    {name : "Unit 4 - Paired", filename : "u4_paired.py"},
    {name : "Unit 5 - Fan", filename : "u5_fan.py"},
    {name : "Unit 5 - Grouped", filename : "u5_grouped.py"},
    {name : "Unit 6 - Simple", filename : "u6_simple.py"},
    {name : "Unit 7 - Simple Compilation", filename : "u7_simplecompilation.py"},
    {name : "Unit 8 - Estimating using Pymc3", filename : "u8_estimating_using_pymc3.py"},
];

