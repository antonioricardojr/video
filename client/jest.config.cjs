module.exports = {
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    },
    transformIgnorePatterns: [
        "/node_modules/(?!<package-to-transform>).*"
      ],
    injectGlobals: true,
};
  