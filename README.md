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
let res = await am.query('SET a AS b WHERE TTL=10s NFETCH=2');
console.log(res) // OK
```

Alternatively
```javascript
let res = await am.get('key');  // null
await am.set('key', 'value', { ttl: '20s', nfetch: 2 });
let res = await am.get('key');  // value
```
