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
        '@addess/(.*)': '<rootDir>/src/address',
        '@profile/(.*)': '<rootDir>/src/profile',
        '@postalcode/(.*)': '<rootDir>/src/postalcode'
    },
    setupFiles: ['<rootDir>/test/jest/setEnvVars.ts'],
};
