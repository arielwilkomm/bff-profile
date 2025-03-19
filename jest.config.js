module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'test/coverage',
    testEnvironment: 'node',
    coverageReporters: ['json', 'html', 'lcov'],
    preset: 'ts-jest',
    testMatch: ['**/**/*.test.ts'],
    reporters: [
        'default',
        [
            'jest-sonar',
            { outputDirectory: 'test/coverage', outputName: 'test-report.xml', reportedFilePath: 'absolute' },
        ],
    ],
    moduleNameMapper: {
        '@environment/(.*)': '<rootDir>/src/common/environment/$1',
        '@constants/(.*)': '<rootDir>/src/common/constants/$1',
        '@exceptions/(.*)': '<rootDir>/src/common/exceptions/$1',
        "@logger": "<rootDir>/src/common/logger/index",
        '@utils/(.*)': '<rootDir>/src/common/utils/$1',
        '@health/(.*)': '<rootDir>/src/health/$1',
        '@addess/(.*)': '<rootDir>/src/address',
        '@profile/(.*)': '<rootDir>/src/profile',
        '@postalcode/(.*)': '<rootDir>/src/postalcode'
    },
    setupFiles: ['<rootDir>/test/jest/setEnvVars.ts'],
};
