module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
// export default {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   moduleNameMapper: {
//     '\\.(css|less|scss|svg|mp3|gif)$': '<rootDir>/__mocks__/fileMock.js',
//   },
// };