module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  setupFiles: ['<rootDir>/testSetup.ts'],
  testMatch: [
    '**/?(*.)+(spec|test).ts?(x)'
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss|png|svg)$': '<rootDir>/assetsMock.ts',
    '@root(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/components/editor/index.tsx'
  ],
  roots: [
    './src'
  ],
  verbose: true
};
