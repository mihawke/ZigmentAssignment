export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    "<rootDir>/src/**/*.test.ts",
    "<rootDir>/jest_tests/**/*.test.ts",
    "<rootDir>/src/**/*.test.ts",
    "<rootDir>/jest_tests/**/*.test.tsx",  // Customize for Jest test files
  ],
  transform: {
      "^.+\\.tsx?$": "ts-jest" 
  // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
  },
}
