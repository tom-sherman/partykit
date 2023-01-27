# partykit

## 0.0.2

### Patch Changes

- [#8](https://github.com/threepointone/partykit/pull/8) [`208c67b`](https://github.com/threepointone/partykit/commit/208c67ba019d39ced0ff1253e53d2c1f5afb0d6e) Thanks [@threepointone](https://github.com/threepointone)! - update esbuild (and misc).

- [#10](https://github.com/threepointone/partykit/pull/10) [`6864be8`](https://github.com/threepointone/partykit/commit/6864be8e0e557429eec888896e15661af7f5a36c) Thanks [@threepointone](https://github.com/threepointone)! - Error when cli is used in older versions of node

  We now throw an error when the CLI is used on node < v18.12.1 (We could probably make this work on node 16, but we'll see in the future of required)

- [#19](https://github.com/threepointone/partykit/pull/19) [`167a677`](https://github.com/threepointone/partykit/commit/167a67728be61926cdf56ba4101c32f86bf3be08) Thanks [@threepointone](https://github.com/threepointone)! - lazy load heavy deps in cli

  This imports modules like edge-runtime, esbuild, etc lazily / on demand in the cli, which should make the cli startup marginally faster.

  Additionally, we're modifying prereleases to use `changeset --snapshot` instead of our custom thing

- [#9](https://github.com/threepointone/partykit/pull/9) [`24f8641`](https://github.com/threepointone/partykit/commit/24f86413f83219591536cffe2e2e896ebd5f0baf) Thanks [@threepointone](https://github.com/threepointone)! - add client id (`_pk`) to connection requests

- [#7](https://github.com/threepointone/partykit/pull/7) [`97c26e7`](https://github.com/threepointone/partykit/commit/97c26e7dfc4abd927dc71fdd2b916e29fd4d8650) Thanks [@threepointone](https://github.com/threepointone)! - `export default {onConnect}`

  changing the server's export signature so it's easier to add types and validate.

- [`d2c4878`](https://github.com/threepointone/partykit/commit/d2c4878f911b78cd32225af06c9182659bcbf6bc) Thanks [@threepointone](https://github.com/threepointone)! - fix: configurable API endpoint name

- [#2](https://github.com/threepointone/partykit/pull/2) [`83570bf`](https://github.com/threepointone/partykit/commit/83570bfb5775da6be3e4c567a3a0426ce784ad2c) Thanks [@threepointone](https://github.com/threepointone)! - read `PARTYKIT_API_BASE` from `process.env`, with a production default

- [#13](https://github.com/threepointone/partykit/pull/13) [`28ada99`](https://github.com/threepointone/partykit/commit/28ada9937b4205cdfc1a655a4cc94c1d4568a639) Thanks [@threepointone](https://github.com/threepointone)! - feat: initial implementation of `partykit env`

  This patch adds an initial implementation of the `partykit env list/pull/add/remove` commands. This doesn't actually use the env vars anywhere yet, but it's a start.

- [#25](https://github.com/threepointone/partykit/pull/25) [`31c95a7`](https://github.com/threepointone/partykit/commit/31c95a74272d525790149ae5e7257dffcdba0a41) Thanks [@threepointone](https://github.com/threepointone)! - s/unstable_onValidate/onBeforeConnect

  This changes the behaviour of unstable_onValidate. Instead of return a boolean, this function now expects an error to be thrown if it's an invalid connection. Further, you can now return a json-serialisable object that gets passed on to onConnect (currently inside room.connections.<id>.unstable_initial, but we'll expose it on the connection soon.). This is particularly cool because onBeforeConnect will usually be run on a different machine from onConnect, but you'll still be able to pass data like session info etc on to onConnect.

  misc: remove `serve`, fix builds.

- [#26](https://github.com/threepointone/partykit/pull/26) [`5eb8f9d`](https://github.com/threepointone/partykit/commit/5eb8f9deffaef138dfad8bb37079c95984306128) Thanks [@threepointone](https://github.com/threepointone)! - feat: persistence / storage (phase 1)

  This implements persistence / storage for partykit. It hijack's cloudflare's DO storage api (without config options). This doesn't implement DO's i/o gates yet, but that's kinda fine, because it means you have to write code that's good in dev (but production will automatically be better). We'll implement them later. Also this currently does in-memory storage. We'll fix that in the future by (optionally) using disk for persistence.

- [`e5832a0`](https://github.com/threepointone/partykit/commit/e5832a05665485d98005cb0a1ecbf2940cd7640b) Thanks [@threepointone](https://github.com/threepointone)! - export "server" type definition

- [#34](https://github.com/threepointone/partykit/pull/34) [`0fdf7a3`](https://github.com/threepointone/partykit/commit/0fdf7a30f5112dfce21d105921674ddff57a1596) Thanks [@threepointone](https://github.com/threepointone)! - y-partykit: remove vendored libs

  We'd previously vendored the libs used by y-partykit (yjs, lib0, etc) to workaround a bug in edge-runtime https://github.com/vercel/edge-runtime/issues/243, but it makes using other libs that include those libs difficult. So instead this patch removes the vendoring, and applies the other workaround (which is to set `minify:true`). The tradeoff for this workaround is that any "dev mode" code (i.e. code wrapped with `if (process.env.NODE_ENV !== 'production')`) will be removed. This is temporary and we'll remove it once the bug is fixed by edge-runtime.

- [#15](https://github.com/threepointone/partykit/pull/15) [`d2959d5`](https://github.com/threepointone/partykit/commit/d2959d54031ae766f1af4d79724f085f5edca82b) Thanks [@threepointone](https://github.com/threepointone)! - integrate `dotenv`, expose `.env` in local dev on `room`

- [#5](https://github.com/threepointone/partykit/pull/5) [`e4b721f`](https://github.com/threepointone/partykit/commit/e4b721f3f36973dcfe27ea1dc7ea8e8d8b271936) Thanks [@threepointone](https://github.com/threepointone)! - queryparams for client, onConnect in server

  client: `new PartySocket` now accepts `query: {...}` that gets encoded as query params in the url when connecting.

  server: `export onConnect(){...}` to better reflect what's happening (and opening the door to other descriptive exports, like onAuth, etc)

- [#3](https://github.com/threepointone/partykit/pull/3) [`7cd9edc`](https://github.com/threepointone/partykit/commit/7cd9edc6d864de4266342774dffd0635515fa2bb) Thanks [@threepointone](https://github.com/threepointone)! - `partykit list`

  very simply, lists all deployed parties.

- [`ee72c1f`](https://github.com/threepointone/partykit/commit/ee72c1f4d20189e6e9377845cf36ad40b4f415cf) Thanks [@threepointone](https://github.com/threepointone)! - configure bundledDependencies

- [#14](https://github.com/threepointone/partykit/pull/14) [`b97b75b`](https://github.com/threepointone/partykit/commit/b97b75b7bc4394befa2b6fb79df06b2c1c58c347) Thanks [@threepointone](https://github.com/threepointone)! - feat: pass room to onConnect handler

- [#6](https://github.com/threepointone/partykit/pull/6) [`b04abec`](https://github.com/threepointone/partykit/commit/b04abec06ed844ca2bc457318b1ef6ccf14a0009) Thanks [@threepointone](https://github.com/threepointone)! - lint for no-floating-promises and consistent-type-imports

  enables some more linting rules (and immediately caught some errors). also fixes caching rules for actions.

- [#4](https://github.com/threepointone/partykit/pull/4) [`d2c5c51`](https://github.com/threepointone/partykit/commit/d2c5c51efce46cafe69de77488dd9e79cc494b7f) Thanks [@threepointone](https://github.com/threepointone)! - fix exports/typings

  This patch fixes how we generate types (by actually doing so), configuring exports in package.json, and making sure it points to the right thing. I had to write a script that moves the generated types to the root for... javascript reasons ™ but at least it works now. good enough.

- [#11](https://github.com/threepointone/partykit/pull/11) [`b1e47ae`](https://github.com/threepointone/partykit/commit/b1e47ae6fe6459bf77dc46cda64bbb931168e76f) Thanks [@threepointone](https://github.com/threepointone)! - add `unstable_onValidate`

  This adds `unstable_onValidate` to server's default export, alongside onConnect. Users are expected to implement this and return a boolean, that will reject the connection when false.

- [#30](https://github.com/threepointone/partykit/pull/30) [`323fce1`](https://github.com/threepointone/partykit/commit/323fce1ef57981922eb52126bddb425da90801e5) Thanks [@threepointone](https://github.com/threepointone)! - chore: update esbuild, edge-runtime, and co.

  of note, esbuild had breaking changes, had to rewrite the rebuild logic.

- [#12](https://github.com/threepointone/partykit/pull/12) [`115c094`](https://github.com/threepointone/partykit/commit/115c09428237b00d4aeade7f35747756b8b1cbc7) Thanks [@threepointone](https://github.com/threepointone)! - rename publish -> deploy

- [#29](https://github.com/threepointone/partykit/pull/29) [`05e647f`](https://github.com/threepointone/partykit/commit/05e647f1044cb92bdc5d05a53feb0202691c944c) Thanks [@threepointone](https://github.com/threepointone)! - fix: add key/value size limits for storage api

  This adds checks for size of key/values for the persistence api (mirroring DO's limits). (2kb keys. 128 kb values)
