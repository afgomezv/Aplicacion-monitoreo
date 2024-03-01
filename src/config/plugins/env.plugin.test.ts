import { envs } from "./env.plugin";

describe("envs.plugin.ts", () => {
  test("should resturn env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "afgomezvonline@gmail.com",
      MAILER_SECRET_KEY: "sgmrbkeybdftcufu",
      PROD: false,
      MONGO_URL: "mongodb://andrey:123456789@localhost:27017",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "andrey",
      MONGO_PASS: "123456789",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("./env.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
