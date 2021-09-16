/// <reference types="node" />
import { Socket } from 'net';
interface IConnectPropType {
    port?: number;
    host?: string;
}
interface ISetterConfig {
    ttl: string;
    nfetch: number;
}
export declare class AmnesiaClient {
    client?: Socket;
    jobResolvers: Map<string, any>;
    constructor();
    connect({ port, host }: IConnectPropType): Promise<unknown>;
    query(queryString: string): Promise<string>;
    get(key: string): Promise<string>;
    set(key: string, value: string, config?: Partial<ISetterConfig>): Promise<boolean>;
    destroy(): void;
}
export {};
