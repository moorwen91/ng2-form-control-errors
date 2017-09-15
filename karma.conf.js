module.exports = function (config) {
  let c = {

    frameworks: [ 'jasmine', 'karma-typescript' ],

    files: [
      { pattern: 'test/index.spec.ts' },
      { pattern: 'src/**/*.+(ts|html)' }
    ],

    exclude: [
      'demo',
      'dist',
      'src/index.ts'
    ],

    plugins: [
      'karma-jasmine',
      'karma-typescript',
      'karma-phantomjs-launcher'
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

    browsers: [ 'PhantomJS' ],

    reporters: [ 'progress', 'karma-typescript' ],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true
  };

  if (config.coveralls === 'true') {
    c.logLevel = config.LOG_DISABLE;
    c.reporters.splice(0, 1);
    c.karmaTypescriptConfig.reports = { 'text-lcov': '' };
  }

  config.set(c);
};
