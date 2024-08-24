import esbuild from 'rollup-plugin-esbuild'
import nodeResolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import { promises as fs } from 'node:fs';
import LoaderBuilder from './loaderBuilder.js';

await fs.rm('dist', { recursive: true, force: true });
await fs.mkdir('dist');

const LICENSE = `/**
* @license GPL-3.0-or-later
*     BCE/FBC
*  Copyright (C) 2024  Sid
*
*  This program is free software: you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation, either version 3 of the License, or
*  (at your option) any later version.
*
*  This program is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*
*  You should have received a copy of the GNU General Public License
*  along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
`;
const loaderBuilder = new LoaderBuilder();

export default {
  input: 'src/index.ts',
  output: { 
    dir: 'dist',
    entryFileNames: 'wce.js',
    chunkFileNames: '[name].js',
    generatedCode: 'es2015',
    sourcemap: true,
    banner: (chunk) => chunk.name === 'index' ? LICENSE : undefined,
  },
  plugins: [
    alias({
      entries: [
        { find: 'buttplug', replacement: 'buttplug/dist/web/buttplug.mjs' },
        { find: 'dexie', replacement: 'dexie/dist/modern/dexie.mjs' }
      ],
    }),
    nodeResolve({ modulesOnly: true }),
    esbuild({
      sourceMap: true,
      minify: true,
      target: 'es2022',
      define: {
        PUBLIC_URL: `"${loaderBuilder.URL}"`,
      },
    }),
  ],
}

for (const f of ['baby.png', 'icon.png', 'stutter.png']) {
  fs.copyFile(`public/${f}`, `dist/${f}`);
}
fs.writeFile('dist/wce-fusam-loader.user.js', loaderBuilder.generateFusamLoader());
fs.writeFile('dist/wce-loader.user.js', loaderBuilder.generateStandaloneLoader());
