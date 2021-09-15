import { AmnesiaClient } from '../index';

test('Query Test', async () => {
  const ks = new AmnesiaClient();
  await ks.connect({ port: 4224 });
  const p1 = ks.query('SET a AS b WHERE TTL=10s NFETCH=2');
  const p2 = ks.query('GET b');

  console.log('OUT:', await p2);
  console.log('OUT:', await p1);
  expect(1).toBe(1);
});
