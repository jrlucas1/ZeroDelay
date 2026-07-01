// ESLint flat config for ZeroDelay.
//
// The extension has NO bundler and NO transpile step: each file runs verbatim
// in a specific execution context, and the available globals change per file.
// So instead of one blanket config we scope globals/sourceType by file, which
// keeps `no-undef` honest (e.g. inject.js must NOT see `chrome`, or we'd miss
// real bugs).
//
// Correctness rules are errors; stylistic ones are warnings. We do NOT mass-
// reformat existing source — if legacy code trips a rule, prefer relaxing the
// rule here over rewriting dozens of lines.

import js from '@eslint/js';
import globals from 'globals';

export default [
    // Third-party / generated / non-source: never linted.
    {
        ignores: [
            'vendor/**',
            'node_modules/**',
            'build/**',
            'publishing/**',
            'icons/**',
        ],
    },

    js.configs.recommended,

    // Shared rule tuning for all linted files.
    {
        rules: {
            // Correctness — keep as errors. These catch real bugs (typos,
            // missing imports, accidental shadowing).
            'no-undef': 'error',
            'no-redeclare': 'error',

            // Unused vars: WARN, not error. The existing source has a couple of
            // pre-existing dead symbols (inject.js `calc_threathold`, the
            // write-only `showCurrent`) that we deliberately do NOT touch — this
            // pipeline adds tooling without rewriting source. Kept visible as a
            // warning so new dead code still shows up.
            'no-unused-vars': ['warn', { args: 'none' }],

            // Style — warnings only, never block CI on formatting.
            'no-empty': 'warn',
            'no-constant-condition': ['warn', { checkLoops: false }],
        },
    },

    // background.js — MV3 service worker + ES module. Has chrome.*, no DOM.
    {
        files: ['background.js'],
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.serviceworker,
                ...globals.webextensions,
            },
        },
    },

    // Extension ES modules running in a page/popup context with chrome.* access.
    {
        files: ['common.js', 'pix.js', 'popup.js'],
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.webextensions,
            },
        },
    },

    // content.js — ES module, browser + webextensions, plus Firefox's cloneInto
    // (an undeclared global provided by the Firefox content-script sandbox).
    {
        files: ['content.js'],
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.webextensions,
                cloneInto: 'readonly',
            },
        },
    },

    // inject.js — PAGE CONTEXT. Runs injected into youtube.com, so it has NO
    // access to chrome.*. Deliberately omit webextensions globals so a stray
    // chrome.* reference here surfaces as a real error. It's an IIFE (script),
    // not a module.
    {
        files: ['inject.js'],
        languageOptions: {
            sourceType: 'script',
            globals: {
                ...globals.browser,
                trustedTypes: 'readonly',
            },
        },
    },

    // Tooling — runs under Node.
    {
        files: ['eslint.config.js', 'scripts/**/*.mjs', '.web-ext-config.mjs'],
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
        },
    },
];
