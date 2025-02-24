import fs from "fs";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { deploy } from "../cli";
import { mockFetchResult, clearMocks } from "./fetchResult-mock";
import { mockConsoleMethods } from "./mock-console";

const std = mockConsoleMethods();

vi.mock("../fetchResult", async () => {
  const { fetchResult } = await import("./fetchResult-mock");
  return {
    fetchResult,
  };
});

const fixture = `${__dirname}/fixture.js`;

process.env.GITHUB_LOGIN = "test-user";
process.env.GITHUB_TOKEN = "test-token";

const currDir = process.cwd();

beforeEach(() => {
  clearMocks();
  // create a tmp dir
  const dirPath = fs.mkdtempSync("pk-test-env");
  // set the cwd to the tmp dir
  process.chdir(dirPath);
});

afterEach(() => {
  // switch back to the original dir
  const tmpDir = process.cwd();
  process.chdir(currDir);
  // remove the tmp dir
  fs.rmdirSync(tmpDir, { recursive: true });
});

describe("deploy", () => {
  it("should error without a valid script", async () => {
    // @ts-expect-error we're purposely not passing a script path
    await expect(deploy({})).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Missing entry point, please specify \\"main\\" in your config"'
    );
  });

  it("should error without a name", async () => {
    await expect(
      // @ts-expect-error we're purposely not passing a name
      deploy({ main: fixture })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Missing project name, please specify \\"name\\" in your config"'
    );
  });

  it("should build and submit a script to the server", async () => {
    let checkedResponse = false;
    mockFetchResult<null>(
      "POST",
      "/parties/test-user/test-script",
      (url, options) => {
        expect(url).toMatchInlineSnapshot('"/parties/test-user/test-script"');
        expect(options?.headers).toMatchInlineSnapshot(`
          {
            "Authorization": "Bearer test-token",
            "X-PartyKit-User-Type": "github",
          }
        `);
        checkedResponse = true;
        return null;
      }
    );
    await deploy({
      main: fixture,
      name: "test-script",
      config: undefined,
      vars: undefined,
      define: undefined,
      preview: undefined,
      withVars: undefined,
      assets: undefined,
    });
    expect(checkedResponse).toBe(true);
  });

  it("should send cli vars without others from config", async () => {
    fs.writeFileSync(
      "partykit.json",
      JSON.stringify({
        name: "test-script",
        vars: {
          a: "a1",
          b: "b2",
          c: "c3",
          d: "d4",
        },
      })
    );

    let checkedResponse = false;
    mockFetchResult<null>(
      "POST",
      "/parties/test-user/test-script",
      (url, options) => {
        expect(url).toMatchInlineSnapshot('"/parties/test-user/test-script"');
        expect(options?.headers).toMatchInlineSnapshot(`
          {
            "Authorization": "Bearer test-token",
            "X-PartyKit-User-Type": "github",
          }
        `);
        const form = options?.body as FormData;
        expect(form.get("vars")).toMatchInlineSnapshot(
          '"{\\"a\\":\\"b\\",\\"c\\":\\"d\\"}"'
        );
        checkedResponse = true;
        return null;
      }
    );
    await deploy({
      main: fixture,
      name: "test-script",
      config: undefined,
      vars: {
        a: "b",
        c: "d",
      },
      define: undefined,
      preview: undefined,
      withVars: undefined,
      assets: undefined,
    });
    expect(checkedResponse).toBe(true);
  });

  it("should send cli vars with config when specified", async () => {
    fs.writeFileSync(
      "partykit.json",
      JSON.stringify({
        name: "test-script",
        vars: {
          a: "a1",
          b: "b2",
          c: "c3",
          d: "d4",
        },
      })
    );

    let checkedResponse = false;
    mockFetchResult<null>(
      "POST",
      "/parties/test-user/test-script",
      (url, options) => {
        expect(url).toMatchInlineSnapshot('"/parties/test-user/test-script"');
        expect(options?.headers).toMatchInlineSnapshot(`
          {
            "Authorization": "Bearer test-token",
            "X-PartyKit-User-Type": "github",
          }
        `);
        const form = options?.body as FormData;
        expect(form.get("vars")).toMatchInlineSnapshot(
          '"{\\"a\\":\\"b\\",\\"b\\":\\"b2\\",\\"c\\":\\"d\\",\\"d\\":\\"d4\\"}"'
        );
        checkedResponse = true;
        return null;
      }
    );
    await deploy({
      main: fixture,
      name: "test-script",
      config: undefined,
      vars: {
        a: "b",
        c: "d",
      },
      define: undefined,
      preview: undefined,
      withVars: true,
      assets: undefined,
    });
    expect(checkedResponse).toBe(true);
  });

  it("should error if the server returns an error", async () => {
    mockFetchResult(
      "POST",
      "/parties/test-user/test-script",
      (_url, _options) => {
        throw new Error("Not OK");
      }
    );
    await expect(
      deploy({
        main: fixture,
        name: "test-script",
        config: undefined,
        vars: undefined,
        define: undefined,
        preview: undefined,
        withVars: undefined,
        assets: undefined,
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot('"Not OK"');
  });

  it('should warn if using "assets" in the config', async () => {
    let checkedResponse = false;
    mockFetchResult<null>(
      "POST",
      "/parties/test-user/test-script",
      (url, options) => {
        expect(url).toMatchInlineSnapshot('"/parties/test-user/test-script"');
        expect(options?.headers).toMatchInlineSnapshot(`
          {
            "Authorization": "Bearer test-token",
            "X-PartyKit-User-Type": "github",
          }
        `);
        checkedResponse = true;
        return null;
      }
    );

    fs.writeFileSync(
      "partykit.json",
      JSON.stringify({
        name: "test-script",
        assets: "./public",
      })
    );

    await deploy({
      main: fixture,
      name: "test-script",
      config: undefined,
      vars: undefined,
      define: undefined,
      preview: undefined,
      withVars: undefined,
      assets: undefined,
    });

    expect(checkedResponse).toBe(true);

    expect(std).toMatchInlineSnapshot(`
      {
        "debug": "",
        "err": "",
        "info": "",
        "out": "Loading config from partykit.json
      Deployed ./../packages/partykit/src/tests/fixture.js as test-script.test-user.partykit.dev",
        "warn": "Warning: uploading assets are not yet supported in deploy mode",
      }
    `);
  });
});
