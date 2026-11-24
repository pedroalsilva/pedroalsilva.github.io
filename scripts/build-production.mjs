import { spawnSync } from 'node:child_process';
// Public build settings, deliberately independent of local .env overrides.
const result = spawnSync(process.execPath, ['node_modules/next/dist/bin/next', 'build', '--webpack'], {
  stdio: 'inherit',
  env: { ...process.env, NEXT_PUBLIC_SITE_URL: 'https://pedroalsilva.github.io', NEXT_PUBLIC_BASE_PATH: '' },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
