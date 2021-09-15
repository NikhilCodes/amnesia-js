import { createConnection, Socket } from 'net';
import { v4 as uuid_v4 } from 'uuid';

const DEFAULT_PORT = 4224;
const DEFAULT_ADDRESS = 'localhost';
const CRLF = '\r\n';

interface IConnectPropType {
  port?: number;
  host?: string;
}

export class AmnesiaClient {
  client?: Socket;
  jobResolvers: Map<string, any>;

  constructor() {
    this.jobResolvers = new Map<string, any>();
  }

  async connect({ port = DEFAULT_PORT, host = DEFAULT_ADDRESS  }: IConnectPropType) {
    return new Promise(
      (resolve) => {
        this.client = createConnection({
          port,
          host,
        }, () => {
          this.client?.on('data', (data: string) => {
            const resp = data.toString().split(':');
            let resolveInner = this.jobResolvers.get(resp[0]);
            this.jobResolvers.delete(resp[0]);
            resolveInner?.(resp[1]);
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
}
