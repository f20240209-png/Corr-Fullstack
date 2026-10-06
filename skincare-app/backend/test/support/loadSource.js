const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
function loadSource(relative, mocks = {}, globals = {}) {
  const filename = path.resolve(__dirname, '../../src', relative);
  const realRequire = createRequire(filename), module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), {
    module, exports: module.exports, Buffer, process, console,
    require: name => Object.hasOwn(mocks, name) ? mocks[name] : realRequire(name),
    ...globals,
  }, { filename });
  return module.exports;
}
async function serve(t, app) {
  const server = await new Promise(resolve => {
    const listening = app.listen(0, '127.0.0.1', () => resolve(listening));
  });
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  return `http://127.0.0.1:${server.address().port}`;
}
module.exports = { loadSource, serve };
