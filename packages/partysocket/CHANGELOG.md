# partysocket

## 0.0.2

### Patch Changes

- [#21](https://github.com/threepointone/partykit/pull/21) [`f01ad2b`](https://github.com/threepointone/partykit/commit/f01ad2b33ff71099344b570ba49d7bf03f7c88bf) Thanks [@threepointone](https://github.com/threepointone)! - partysocket

  partysocket is a for of reconnecting-websocket (which appears to be abandoned), that adds a few missing features and fixes a few bugs.

- [#35](https://github.com/threepointone/partykit/pull/35) [`7eb3b36`](https://github.com/threepointone/partykit/commit/7eb3b3621027480092a927bec5b6096ba4614027) Thanks [@threepointone](https://github.com/threepointone)! - y-partykit (feat): `onCommand` as a server configuration option

  y-partykit currently assumes all messages on the wire are yjs messages (usually all binary data), but we have usecases where we want to send arbitrary commands to the server and act on them (usually still with the context of a doc). So now y-partykit accepts a handler for all string messages that we're calling 'commands' - `onCommand(string, Y.Doc)`.

  Additionally, partysocket now also exports it's base websocket class as partysocket/ws
