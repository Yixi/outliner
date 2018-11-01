module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupTestFrameworkScriptFile: '<rootDir>/testSetup.ts',
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss|png|svg)$": "<rootDir>/assetsMock.ts",
    "@root(.*)$": "<rootDir>/src/$1"
  },
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  roots: ['<rootDir>/src'],
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
  ]
};
