module.exports = {
  default: {
    requireModule: [
      'ts-node/register',
      'dotenv/config'
    ],
    require: [
      'steps/**/*.ts',
      'support/**/*.ts'
    ],
    paths: [
      'features/**/*.feature'
    ],
    format: [
      'summary',
      process.stdout.isTTY ? 'progress-bar' : 'progress',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    }
  }
};
