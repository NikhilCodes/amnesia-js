# Amnesia JS
[AmnesiaDB](https://github.com/NikhilCodes/AmnesiaDB) Official Client

## Example

Connect to locally hosted Amnesia DB
```javascript
import { AmnesiaClient } from 'amnesia-client';

const am = new AmnesiaClient();
await am.connect({ port: 4224 });
```

Run a Query
```javascript
await am.query('SET a AS b WHERE TTL=10s NFETCH=2') // OK
```

