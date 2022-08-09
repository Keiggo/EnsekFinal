import type { Config } from '@jest/types';
import { DateTime } from 'luxon';

// Sync object
const config: Config.InitialOptions = {
    testMatch: ['**/+(*.)+(spec).+(ts|js)','**/**/(*.)+(spec).+(ts|js)', '**/**/**/(*.)+(spec).+(ts|js)'],
    testTimeout: 50000,
    slowTestThreshold: 30,
    moduleFileExtensions: ['ts', 'js'],
    moduleDirectories: ['node_modules'],
    modulePaths: ['./'],
    verbose: false,
    preset: 'jest-preset-angular',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    }​​,
    runner: 'groups',
    reporters: [
        'default',
        ['./node_modules/jest-html-reporter', {
            'pageTitle': 'Test app',
            'includeFailureMsg': true,
            'includeConsoleLog': true,
            'outputPath': `reports/jest-basic/Basic Report - ${DateTime.now().toFormat('dd-MM-yyyy hh.mm')}.html`,
        }​​],
        ['./node_modules/jest-html-reporters', {
            'publicPath': 'reports/jest-html',
            'filename': `jest-report - ${DateTime.now().toFormat('dd-MM-yyyy hh.mm')}.html`,
            'pageTitle': 'Test Report',
            'expand': false,
            'customInfos': [{​​title: 'Test app' }​​],
            'includeConsoleLog': true,
        }​​]
    ],
}​​;

export default config;
