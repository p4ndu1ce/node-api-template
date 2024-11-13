/* eslint-disable n/no-missing-import */
import type { JestConfigWithTsJest } from 'ts-jest/dist/types';
import { defaults as tsjPreset } from 'ts-jest/presets';

const config: JestConfigWithTsJest = {
  ...tsjPreset,
  transform: {
    ...tsjPreset.transform,
    // [...]
  },
  testEnvironment: 'node',
  coverageReporters: ['lcovonly', 'clover', 'text'],
  coverageDirectory: 'coverage-report',
  setupFilesAfterEnv: ['jest-extended/all'],
  testRegex: '/test/.*.test.[jt]sx?$',
};

export default config;
