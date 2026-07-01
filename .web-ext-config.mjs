// Shared web-ext configuration, consumed by both `web-ext lint` (via
// scripts/lint-ext.mjs) and `web-ext build` (the release workflow). Keeping one
// ignore list means the linter and the packaged .zip see the same file set:
// only what the extension actually ships.
//
// ignoreFiles and artifactsDir are global web-ext options (they live at the top
// level and apply to both lint and build); overwriteDest is a build-only option.

export default {
    // Dev/tooling cruft that must not end up in the packaged extension.
    ignoreFiles: [
        'node_modules',
        '.github',
        'publishing',
        'scripts',
        'package.json',
        'package-lock.json',
        'eslint.config.js',
        '.web-ext-config.mjs',
        '*.md',
        '.gitignore',
    ],

    // Emit the .zip to build/ (git-ignored) to match publishing/CHECKLIST.md and
    // the release workflow.
    artifactsDir: 'build',

    build: {
        // Overwrite any stale artifact from a previous run.
        overwriteDest: true,
    },
};
