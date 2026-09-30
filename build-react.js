const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['react-charts.jsx'],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  define: { 'process.env.NODE_ENV': '"production"' },
  outfile: 'public/react-charts.js',
  minify: true,
  legalComments: 'none',
}).then(() => {
  console.log('React charts bundle ready');
}).catch(() => {
  process.exitCode = 1;
});
