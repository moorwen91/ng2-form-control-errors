module.exports = function (config) {
  config.set({

    frameworks: [ 'jasmine', 'karma-typescript' ],

    files: [
      { pattern: 'test/index.spec.ts' },
      { pattern: 'src/**/*.+(ts|html)' }
    ],

    exclude: [
      'demo',
      'dist'
    ],

    plugins: [
      'karma-jasmine',
      'karma-typescript',
      'karma-chrome-launcher'
    ],

    preprocessors: {
      '**/*.ts': [ 'karma-typescript' ]
    },

    karmaTypescriptConfig: {
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/,
        transforms: [
          require('karma-typescript-angular2-transform')
        ]
      },
      compilerOptions: {
        lib: ['ES2015', 'DOM']
      },
      tsconfig: './tsconfig.test.json'
    },

    browsers: [
      'Chrome',
    ],

    reporters: [
      'progress',
      'karma-typescript'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true
  });
};
