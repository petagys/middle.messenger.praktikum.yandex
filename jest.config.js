module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.ts?$': 'babel-jest',
    },
    setupFilesAfterEnv: [
        '<rootDir>/src/test/setup.ts',
    ],
};
