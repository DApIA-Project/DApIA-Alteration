/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testPathIgnorePatterns: ['./out/test/generator.test.js'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};