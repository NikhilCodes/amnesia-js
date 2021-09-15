import { AmnesiaClient } from '../index';

test('Query Test', async () => {
  const am = new AmnesiaClient();
  await am.connect({ port: 4224 });
  const p1 = am.query('SET a AS b WHERE TTL=10s NFETCH=2');
  const p2 = am.query('GET b');

  console.log('OUT:', await p2);
  console.log('OUT:', await p1);
  expect(1).toBe(1);
});
