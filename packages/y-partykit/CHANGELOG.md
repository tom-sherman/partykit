# y-partykit

## 0.0.1

### Patch Changes

- [#27](https://github.com/threepointone/partykit/pull/27) [`1f384a0`](https://github.com/threepointone/partykit/commit/1f384a02d70ad4c6a632c4478371f3f8e6182c27) Thanks [@threepointone](https://github.com/threepointone)! - feat: y-partykit persistence support

  This adds persistence support for y-partykit (based on the work at y-workers). It... just works haha. Pass `persist:true` to `onConnect` to store it. This still bumps into DO's 128 kb limit, but we'll fix that asap.

- [#18](https://github.com/threepointone/partykit/pull/18) [`f255e12`](https://github.com/threepointone/partykit/commit/f255e1268e9e36d16855bb7388664219c4fdfd0e) Thanks [@threepointone](https://github.com/threepointone)! - y-partykit: callback/persistence configuration

  This patch now properly forks y-websocket, and beings in functionality for passing configuration for callbacks/persistence (that was previously using process.env vars). We also fix builds/type generation for the package.

- [#17](https://github.com/threepointone/partykit/pull/17) [`bf2e66f`](https://github.com/threepointone/partykit/commit/bf2e66fc07dd749b502343c601eef55ceb5d56de) Thanks [@threepointone](https://github.com/threepointone)! - y-partykit: fix builds, usage

  This patch fixes y-partykit so it can actually be published and used in the platform.

- [#28](https://github.com/threepointone/partykit/pull/28) [`f42b1e0`](https://github.com/threepointone/partykit/commit/f42b1e080d21f5f1eddfdf71c33b9a752c5cbace) Thanks [@threepointone](https://github.com/threepointone)! - better types for storage keys in y-partykit

- [#34](https://github.com/threepointone/partykit/pull/34) [`0fdf7a3`](https://github.com/threepointone/partykit/commit/0fdf7a30f5112dfce21d105921674ddff57a1596) Thanks [@threepointone](https://github.com/threepointone)! - y-partykit: remove vendored libs

  We'd previously vendored the libs used by y-partykit (yjs, lib0, etc) to workaround a bug in edge-runtime https://github.com/vercel/edge-runtime/issues/243, but it makes using other libs that include those libs difficult. So instead this patch removes the vendoring, and applies the other workaround (which is to set `minify:true`). The tradeoff for this workaround is that any "dev mode" code (i.e. code wrapped with `if (process.env.NODE_ENV !== 'production')`) will be removed. This is temporary and we'll remove it once the bug is fixed by edge-runtime.

- [#33](https://github.com/threepointone/partykit/pull/33) [`37986a8`](https://github.com/threepointone/partykit/commit/37986a8bb8dd9340a8fe7e59a53ea5468a36059a) Thanks [@threepointone](https://github.com/threepointone)! - y-partykit: remove document size limits

  By chunking values, we can workaround DO's 128 kb value size limit. This patch implements that, and adds a couple of tests too.

- [#22](https://github.com/threepointone/partykit/pull/22) [`825bb02`](https://github.com/threepointone/partykit/commit/825bb02aee262f3c0c12e8b9602339666643840a) Thanks [@threepointone](https://github.com/threepointone)! - y-partykit: export YPartyKitProvider

- [#16](https://github.com/threepointone/partykit/pull/16) [`13c4acf`](https://github.com/threepointone/partykit/commit/13c4acf2b53bf3de12c6e3c5b7f27f8b6f423481) Thanks [@threepointone](https://github.com/threepointone)! - y-partykit: first cut

  This lands a first implementation of yjs for partykit. It uses patch-package to create a modified build of y-websocket, and re-exports it for usage in a partykit server. This also lands a small example of lexical+y-partykit.

- [#31](https://github.com/threepointone/partykit/pull/31) [`984a9ec`](https://github.com/threepointone/partykit/commit/984a9eccc1754cebc456d814eabed1e39aa511b8) Thanks [@threepointone](https://github.com/threepointone)! - [y-partykit] fix: write state to storage on connection close

  we'd forgotten to implement `writeState()` so data wasn't being saved when everyone left a room. the fix is to implement, seems fine now.

- [#30](https://github.com/threepointone/partykit/pull/30) [`323fce1`](https://github.com/threepointone/partykit/commit/323fce1ef57981922eb52126bddb425da90801e5) Thanks [@threepointone](https://github.com/threepointone)! - chore: update esbuild, edge-runtime, and co.

  of note, esbuild had breaking changes, had to rewrite the rebuild logic.

- [#35](https://github.com/threepointone/partykit/pull/35) [`7eb3b36`](https://github.com/threepointone/partykit/commit/7eb3b3621027480092a927bec5b6096ba4614027) Thanks [@threepointone](https://github.com/threepointone)! - y-partykit (feat): `onCommand` as a server configuration option

  y-partykit currently assumes all messages on the wire are yjs messages (usually all binary data), but we have usecases where we want to send arbitrary commands to the server and act on them (usually still with the context of a doc). So now y-partykit accepts a handler for all string messages that we're calling 'commands' - `onCommand(string, Y.Doc)`.

  Additionally, partysocket now also exports it's base websocket class as partysocket/ws
