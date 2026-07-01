// Wrapper around `web-ext lint`.
//
// web-ext exits non-zero on ANY error, and today the extension has 3 KNOWN
// errors that are all Firefox/AMO-only and require manifest changes we're
// intentionally NOT making yet (Firefox support is still in progress):
//
//   - MANIFEST_FIELD_INVALID          "author" is an object, not a string
//   - BACKGROUND_SERVICE_WORKER_NOFALLBACK  no background.scripts fallback
//   - ADDON_ID_REQUIRED               no browser_specific_settings.gecko.id
//
// We still want the report visible AND we still want CI to fail if a NEW
// error appears (a real manifest regression). So: run the linter, print its
// output, parse the machine-readable summary, and exit 0 only when the set of
// error codes equals the known baseline — otherwise exit 1.

import { spawnSync } from 'node:child_process';

const KNOWN_ERROR_CODES = new Set([
    'MANIFEST_FIELD_INVALID',
    'BACKGROUND_SERVICE_WORKER_NOFALLBACK',
    'ADDON_ID_REQUIRED',
]);

// Human-readable run (inherits stdio so the full table shows in logs).
spawnSync('web-ext', ['lint'], { stdio: 'inherit', shell: true });

// Machine-readable run to inspect the actual error codes.
const json = spawnSync('web-ext', ['lint', '-o', 'json'], { encoding: 'utf8', shell: true });
let report;
try {
    report = JSON.parse(json.stdout);
} catch {
    console.error('\nlint:ext — could not parse web-ext JSON output; failing to be safe.');
    process.exit(1);
}

const errorCodes = (report.errors ?? []).map(e => e.code);
const unexpected = errorCodes.filter(code => !KNOWN_ERROR_CODES.has(code));

if (unexpected.length) {
    console.error(`\nlint:ext — NEW web-ext error(s) not in the known baseline: ${[...new Set(unexpected)].join(', ')}`);
    console.error('Fix the manifest or update KNOWN_ERROR_CODES in scripts/lint-ext.mjs if this is intentional.');
    process.exit(1);
}

const known = errorCodes.length;
console.log(`\nlint:ext — OK (${known} known Firefox/AMO baseline error(s) tolerated; no new errors).`);
