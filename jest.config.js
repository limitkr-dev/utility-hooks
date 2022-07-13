/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "jsdom",
};

module.exports = config;
