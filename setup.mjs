import fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

if (process.env.use_pact_consumer || process.env.use_pact_provider) {
  packageJson.devDependencies['pact-foundation/pact'] = '10.1.2';
  packageJson.devDependencies['pact-foundation/pact-core'] = '14.0.1';
  packageJson.dependencies['axios'] = '^1.6.5';
  packageJson.dependencies['nestjs/axios'] = '^0.0.5';
}

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
