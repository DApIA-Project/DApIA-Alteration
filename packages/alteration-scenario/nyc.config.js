module.exports = {
  // Spécifie les dossiers et fichiers à couvrir
  include: ['src/**/*.ts'],

  // Exclut les fichiers et dossiers de la couverture
  exclude: ['node_modules', 'dist', 'src/test/**/*'],

  // Spécifie comment les fichiers couverts sont instrumentés
  instrument: {
    // Active l'instrumentation pour le code TypeScript
    'src/**/*.ts': true,
  },

  // Spécifie le format de sortie du rapport de couverture
  reporter: ['text', 'html'],

  // Configuration du format de rapport HTML
  ['report-dir']: 'coverage',
  ['html']: {
    // Configurer les options de formatage du rapport HTML
    subdir: 'html',
    'show-skip': true,
  },
}
