import { languages } from 'monaco-editor'
import IMonarchLanguage = languages.IMonarchLanguage

const ALTERATION_SCENARIO_FORMAT: IMonarchLanguage = {
  defaultToken: 'invalid',
  keywords: [
    'hide',
    'create',
    'alter',
    'saturate',
    'replay',
    'delay',
    'rotate',
    'cut',
    'at',
    'from',
    'until',
    'for',
    'with_values',
    'let',
    'to',
    'with',
    'with_altitude',
    'with_waypoints',
    'with_delay',
    'with_frequency',
    'with_angle',
    'triggered_by',
    'from_recording',
    'do',
    'each',
    'satisfying',
  ],
  typeKeywords: [
    'seconds',
    'and',
    'in',
    'centered',
    'polygon',
    'circle',
    'radius',
    'filter',
    'vertices',
    'area',
    'global',
  ],
  operators: [
    '=',
    '>',
    '<',
    '!',
    '~',
    '?',
    ':',
    '==',
    '<=',
    '>=',
    '!=',
    '&&',
    '||',
    '++',
    '--',
    '+',
    '-',
    '*',
    '/',
    '&',
    '|',
    '^',
    '%',
    '<<',
    '>>',
    '>>>',
    '+=',
    '-=',
    '*=',
    '/=',
    '&=',
    '|=',
    '^=',
    '%=',
    '<<=',
    '>>=',
    '>>>=',
    ',',
  ],

  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*/^%]+/,

  // C# style strings
  escapes:
    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            '@typeKeywords': 'regexp.escape.control',
            '@keywords': 'keyword',
            '@default': 'identifier',
          },
        },
      ],
      [/[A-Z][\w$]*/, 'type.identifier'], // to show class names nicely

      // whitespace
      { include: '@whitespace' },

      // delimiters and operators
      [/[{}()[\]]/, '@brackets'],
      [/[<>](?!@symbols)/, '@brackets'],
      [
        /@symbols/,
        {
          cases: {
            '@operators': 'operator',
            '@default': '',
          },
        },
      ],

      // @ annotations.
      // As an example, we emit a debugging log message on these tokens.
      // Note: message are supressed during the first load -- change some lines to see them.
      [
        /@\s*[a-zA-Z_$][\w$]*/,
        { token: 'annotation', log: 'annotation token: $0' },
      ],

      // numbers
      [/\d*\.\d+([eE][-+]?\d+)?/, 'number.float'],
      [/0[xX][0-9a-fA-F]+/, 'number.hex'],
      [/\d+/, 'number'],

      // delimiter: after number because of .\d floats
      [/[;,.]/, 'delimiter'],

      // strings
      [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
      [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

      // characters
      [/'[^\\']'/, 'string'],
      [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
      [/'/, 'string.invalid'],
    ],

    comment: [
      [/[^/*]+/, 'comment'],
      [/\/\*/, 'comment', '@push'], // nested comment
      ['\\*/', 'comment', '@pop'],
      [/[/*]/, 'comment'],
    ],

    string: [
      [/[^\\"]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/\/\*/, 'comment', '@comment'],
      [/\/\/.*$/, 'comment'],
    ],
  },
}

export function getDocumentationLabel(label: string): string | undefined {
  switch (label) {
    case '=':
      return 'This value replaces the current value of the parameter'
    case '-=':
      return 'Subtract this value from the current value of the parameter'
    case '+=':
      return 'Add this value to the current value of the parameter'
    case '--=':
      return 'Decrement this value to the current value of the parameter on each line'
    case '++=':
      return 'Increment this value to the current value of the parameter on each line'
    case '*=':
      return 'Multiply this value to the current value of the parameter'
    case '<<':
      return 'This value replaces the current value of the parameter'
    case '>>':
      return 'This value replaces the current value of the parameter'
    case 'let':
      return 'Used to create a variable'
    case 'alter':
      return 'Used to modify features or trajectories'
    case 'hide':
      return 'Used to conceal aircraft'
    case 'create':
      return 'Used to create aircraft'
    case 'replay':
      return 'Used to replay aircraft'
    case 'delay':
      return 'Used to change aircraft time'
    case 'saturate':
      return 'Used to create many aircraft'
    case 'alter_speed':
      return 'Used to modify the speed of the aircraft'
    case 'rotate':
      return 'Used to turn the aircraft path'
    case 'cut':
      return 'Used to suppress aircraft'
    case 'plane':
      return 'Used to choose a specific aircraft'
    case 'all_planes':
      return 'Used to select all aircraft'
    default:
      return undefined
  }
}
export default ALTERATION_SCENARIO_FORMAT
