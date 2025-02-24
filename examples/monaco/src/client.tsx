/// <reference no-default-lib="true"/>
/// <reference lib="dom"/>

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-env browser */

import * as Y from "yjs";
import YPartyKitProvider from "y-partykit/provider";
import { MonacoBinding } from "y-monaco";
import * as monaco from "monaco-editor";

import BetterWebSocket from "partysocket/ws";

// @ts-expect-error TODO: fix this
window.MonacoEnvironment = {
  // @ts-expect-error TODO: fix this
  getWorkerUrl: function (moduleId, label) {
    if (label === "json") {
      // return "/dist/json.worker.bundle.js";
      return "/dist/monaco-editor/esm/vs/language/json/json.js";
    }
    if (label === "css" || label === "scss" || label === "less") {
      return "/dist/monaco-editor/esm/vs/language/css/css.js";
      // return "/dist/css.worker.bundle.js";
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return "/dist/monaco-editor/esm/vs/language/html/html.js";
      // return "/dist/html.worker.bundle.js";
    }
    if (label === "typescript" || label === "javascript") {
      // return "/dist/ts.worker.bundle.js";
      return "/dist/monaco-editor/esm/vs/language/typescript/ts.js";
    }
    return "/dist/monaco-editor/esm/vs/editor/editor.worker.js";
    // return "/dist/editor.worker.bundle.js";
  },
};

declare const PARTYKIT_HOST: string | undefined;

const partykitHost =
  typeof PARTYKIT_HOST === "undefined" ? "localhost:1999" : PARTYKIT_HOST;

// @ts-expect-error TODO: fix this
window.addEventListener("load", () => {
  const ydoc = new Y.Doc();
  const provider = new YPartyKitProvider(
    partykitHost || "localhost:1999",
    "monaco-demo",
    ydoc,
    {
      // @ts-expect-error TODO: fix this
      WebSocketPolyfill: BetterWebSocket,
    }
  );

  provider.ws?.send("do-the-thing");

  const type = ydoc.getText("monaco");

  const editor = monaco.editor.create(
    // @ts-expect-error TODO: fix this
    /** @type {HTMLElement} */ document.getElementById("monaco-editor")!,
    {
      value: "",
      language: "javascript",
      theme: "vs-dark",
    }
  );
  new MonacoBinding(
    type,
    /** @type {monaco.editor.ITextModel} */ editor.getModel()!,
    new Set([editor]),
    provider.awareness
  );

  const connectBtn =
    // @ts-expect-error TODO: fix this
    /** @type {HTMLElement} */ document.getElementById("y-connect-btn")!;
  connectBtn.addEventListener("click", () => {
    if (provider.shouldConnect) {
      provider.disconnect();
      connectBtn.textContent = "Connect";
    } else {
      provider.connect();
      connectBtn.textContent = "Disconnect";
    }
  });
});
