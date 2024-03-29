import typescript from '@rollup/plugin-typescript';
import esbuild from 'rollup-plugin-esbuild';
import packageJson from './package.json' assert { type: "json" };

const name = packageJson.main.replace(/\.js$/, '');

export default [
  {
    input: 'src/index.ts',
    plugins: [
      esbuild({
        minify: true
      }),
      typescript({
        declaration: true,
        declarationDir: './', // Adjust this to your preferred .d.ts output directory
      }),
    ],
    output: [
      {
        file: `${name}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `${name}.mjs`,
        format: 'es',
        sourcemap: true,
      },
    ],
  },
];
