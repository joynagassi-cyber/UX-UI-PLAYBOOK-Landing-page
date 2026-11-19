// Build/test tools read the same trusted TypeScript/JSON editorial modules as Next.js.
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function loadData(relativePath) {
  const filename = path.resolve(root, relativePath);
  if (cache.has(filename)) return cache.get(filename).exports;
  if (filename.endsWith('.json')) return JSON.parse(fs.readFileSync(filename, 'utf8'));
  const module = { exports: {} };
  cache.set(filename, module);
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    fileName: filename,
  }).outputText;
  const localRequire = (name) => {
    if (name.startsWith('@/') || name.startsWith('.')) {
      let relative = name.startsWith('@/') ? `src/${name.slice(2)}` : path.relative(root, path.resolve(path.dirname(filename), name));
      if (!path.extname(relative)) relative += '.ts';
      return loadData(relative);
    }
    return require(name);
  };
  new Function('require', 'module', 'exports', 'process', compiled)(localRequire, module, module.exports, process);
  return module.exports;
}
module.exports = { loadData, root };
