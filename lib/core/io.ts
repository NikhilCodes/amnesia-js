import { createConnection, Socket } from 'net';
import { v4 as uuid_v4 } from 'uuid';
import { CRLF, DEFAULT_ADDRESS, DEFAULT_PORT } from '../constants';

interface IConnectPropType {
  port?: number;
  host?: string;
}

interface ISetterConfig {
  ttl: string;
  nfetch: number;
}

export class AmnesiaClient {
  client?: Socket;
  jobResolvers: Map<string, any>;

  constructor() {
    this.jobResolvers = new Map<string, any>();
  }

  async connect({ port = DEFAULT_PORT, host = DEFAULT_ADDRESS }: IConnectPropType) {
    return new Promise(
      (resolve) => {
        this.client = createConnection({
          port,
          host,
        }, () => {
          this.client?.on('data', (data: string) => {
            const respList = data.toString().trimEnd().split('\r\n');
            respList.forEach((value, index) => {
              let resp = value.split(':');
              let resolveInner = this.jobResolvers.get(resp[0]);
              this.jobResolvers.delete(resp[0]);
              resolveInner?.(resp[1]);
            });
          });
          console.debug('Connected to Amnesia DB');
          resolve(this.client);
        });
      },
    );
  }

  async query(queryString: string) {
    const jobId = uuid_v4();

    return new Promise<string>(
      (resolve) => {
        this.jobResolvers.set(jobId, resolve);
        this.client?.write(`${jobId}:${queryString}${CRLF}`);
      },
    );
  }

  async get(key: string) {
    const resp = await this.query(`GET ${key}`);
    if (resp === '<NIL>') {
      return null;
    }
    return resp;
  }

  async set(key: string, value: string, config?: Partial<ISetterConfig>) {
    let queryString = `SET "${key}" AS "${value}"`
    const { ttl, nfetch } = config ?? {}
    if (ttl || nfetch) {
      queryString += ` WHERE${ttl ? ` TTL=${ttl}` : ''}${nfetch ? ` NFETCH=${nfetch}` : ''}`
    }
    await this.query(queryString);
    return true;
  }

  destroy() {
    this.client.destroy();
  }
}
