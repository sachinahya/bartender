import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.d.ts',
    '!src/**/*.generated.ts',
    '!src/**/*.stories.tsx',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'cobertura'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  setupFilesAfterEnv: ['jest-extended/all', './src/jest-setup.ts'],
  testEnvironment: 'jsdom',
  resetMocks: true,
  restoreMocks: true,
};

export default config;
