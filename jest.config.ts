import type { Config } from '@jest/types';
// moment.js has been deprecated. luxon is touted as a replacement
import { DateTime } from 'luxon';

// Sync object
const config: Config.InitialOptions = {
    testMatch: ['**/+(*.)+(spec).+(ts|js)','**/**/(*.)+(spec).+(ts|js)', '**/**/**/(*.)+(spec).+(ts|js)'],
    testTimeout: 50000,
    slowTestThreshold: 30,
    collectCoverage: true,
    coverageProvider: 'v8',
    coverageReporters: ['html-spa'],
    coverageDirectory: './reports/coverage/v8',
    moduleFileExtensions: ['ts', 'js'],
    moduleDirectories: ['node_modules'],
    modulePaths: ['./'],
    verbose: false,
    preset: 'jest-preset-angular',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    }​​,
    runner: 'groups',
    // Details of the reporter being used. Included 3 different types here.
    // If you want results reported in pipeline you will need to include the junit reporter.
    // The other two are different HTML reports - chose your preferred one and delete the other
    reporters: [
        'default',
        ['./node_modules/jest-html-reporter', {
            'pageTitle': 'MICA 4 E2E Test Report',
            'includeFailureMsg': true,
            'includeConsoleLog': true,
            'outputPath': `reports/jest-basic/Basic Report - ${DateTime.now().toFormat('dd-MM-yyyy hh.mm')}.html`,
        }​​],
        ['./node_modules/jest-html-reporters', {
            'publicPath': 'reports/jest-html',
            'filename': `jest-report - ${DateTime.now().toFormat('dd-MM-yyyy hh.mm')}.html`,
            'pageTitle': 'Test Report',
            'expand': false,
            'customInfos': [{​​title: 'MICA 4' }​​],
            'includeConsoleLog': true,
        }​​]
    ],
}​​;

export default config;
