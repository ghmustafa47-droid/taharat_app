import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const privateReview = process.argv.includes('--private-review');
const output = privateReview ? 'dist-private' : 'dist';
const basePath = process.env.TAHARAH_BASE_PATH || '';

if (basePath && !/^\/(?:[\w-]+\/)*[\w-]+$/.test(basePath)) {
  throw new Error('TAHARAH_BASE_PATH must look like /taharat_app, without a trailing slash.');
}

if (existsSync('public/manuscript') && readdirSync('public/manuscript').length) {
  throw new Error('Move manuscript scans out of public/manuscript before exporting.');
}

const scans = privateReview ? JSON.parse(readFileSync('inventory.json', 'utf8')).sources : [];
for (const source of scans) {
  if (!existsSync(join('..', source.file))) {
    throw new Error('Missing private manuscript source for ' + source.source_id);
  }
}

execFileSync(process.execPath, [require.resolve('expo/bin/cli'), 'export', '--platform', 'web', '--output-dir', output], {
  stdio: 'inherit',
  env: { ...process.env, EXPO_PUBLIC_SHOW_MANUSCRIPTS: privateReview ? '1' : '0' },
});

if (privateReview) {
  const scanDirectory = join(output, 'manuscript');
  mkdirSync(scanDirectory, { recursive: true });
  for (const source of scans) {
    copyFileSync(join('..', source.file), join(scanDirectory, source.source_id + '.jpg'));
  }
}
