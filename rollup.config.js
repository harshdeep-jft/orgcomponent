import babel from 'rollup-plugin-babel';


const packageJson = require("./package.json");

export default [
    {
        input: 'src/components/index.js',
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: "inline",
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: "inline",
            },
        ],
        plugins: [
            babel({
              exclude: 'node_modules/**',
            }),
        ],
    },
    {
        input: "dist/esm/index.js",
        output: [{ file: "dist/index.js", format: "cjs"}],

    }
]
