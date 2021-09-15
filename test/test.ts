import { AmnesiaClient } from '../index';

test('Query Test', async () => {
  const am = new AmnesiaClient();
  await am.connect({});
  const p1 = am.query('SET a AS b WHERE TTL=10s NFETCH=2');
  const p2 = am.query('GET b');

  let v1 = await p2;
  let v2 = await p1;
  expect(v1).toContain('<NIL>');
  expect(v2).toContain('OK');
  am.destroy()
});
