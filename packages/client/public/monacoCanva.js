"use strict";
import { MonacoEditorLanguageClientWrapper } from "./monaco/monaco-editor-wrapper/index.js";
import { buildWorkerDefinition } from "./monaco/monaco-editor-workers/index.js";

buildWorkerDefinition('./monaco/monaco-editor-workers/workers', new URL('', window.location.href).href, false);

MonacoEditorLanguageClientWrapper.addMonacoStyles('monaco-editor-styles');

const client = new MonacoEditorLanguageClientWrapper('42');
const editorConfig = client.getEditorConfig();
editorConfig.setMainLanguageId('fditscenario');

let keywords = ['hide','create','alter','alter_speed','saturate','replay','delay','rotate', 'cut', 'at', 'from', 'until', 'for', 'with_values',
                'let','assert','to','with','with_altitude','with_waypoints', 'with_delay','with_frequency', 'with_angle','triggered_by',
                'from_recording', 'do', 'each','satisfying'];

editorConfig.setMonarchTokensProvider({
    //defaultToken: 'invalid',
    keywords,
    typeKeywords: [
        'seconds', 'and', 'in','centered', 'polygon','circle','radius','filter','vertices', 'area','global'
    ],
    operators: [
        '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
        '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
        '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
        '%=', '<<=', '>>=', '>>>='
    ],

    // we include these common regular expressions
    symbols:  /[=><!~?:&|+\-*\/\^%]+/,

    // C# style strings
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // identifiers and keywords
            [/[a-z_$][\w$]*/, { cases: { '@typeKeywords': 'regexp.escape.control',
                    '@keywords': 'keyword',
                    '@default': 'identifier' } }],
            [/[A-Z][\w\$]*/, 'type.identifier' ],  // to show class names nicely

            // whitespace
            { include: '@whitespace' },

            // delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            [/[<>](?!@symbols)/, '@brackets'],
            [/@symbols/, { cases: { '@operators': 'operator',
                    '@default'  : '' } } ],

            // @ annotations.
            // As an example, we emit a debugging log message on these tokens.
            // Note: message are supressed during the first load -- change some lines to see them.
            [/@\s*[a-zA-Z_\$][\w\$]*/, { token: 'annotation', log: 'annotation token: $0' }],

            // numbers
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F]+/, 'number.hex'],
            [/\d+/, 'number'],

            // delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],

            // strings
            [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
            [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],

            // characters
            [/'[^\\']'/, 'string'],
            [/(')(@escapes)(')/, ['string','string.escape','string']],
            [/'/, 'string.invalid']
        ],

        comment: [
            [/[^\/*]+/, 'comment' ],
            [/\/\*/,    'comment', '@push' ],    // nested comment
            ["\\*/",    'comment', '@pop'  ],
            [/[\/*]/,   'comment' ]
        ],

        string: [
            [/[^\\"]+/,  'string'],
            [/@escapes/, 'string.escape'],
            [/\\./,      'string.escape.invalid'],
            [/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
        ],

        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\/\*/,       'comment', '@comment' ],
            [/\/\/.*$/,    'comment'],
        ],
    },
});

editorConfig.setMainCode(`alter all_planes at 7 seconds 
with_values ICAO = "39AC47" 
and CALLSIGN = "SAMU25"`);

editorConfig.theme = 'vs-dark';
editorConfig.useLanguageClient = true;
editorConfig.useWebSocket = false;

const workerURL = new URL('./monaco/fditscenario-server-worker.js', import.meta.url);
const lsWorker = new Worker(workerURL.href, {
    type: 'classic',
    name: 'Fditscenario Language Server'
});

client.setWorker(lsWorker);
await client.startEditor(document.getElementById("monaco-editor-root"));