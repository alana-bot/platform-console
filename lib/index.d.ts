/// <reference types="bluebird" />
import * as Promise from 'bluebird';
import { PlatformMiddleware } from '@alana/core/lib/types/platform';
import { Message } from '@alana/core/lib/types/bot';
import { User, BasicUser } from '@alana/core/lib/types/user';
import Botler from '@alana/core';
export default class Console implements PlatformMiddleware {
    private rl;
    protected theUser: BasicUser;
    protected bot: Botler;
    constructor(bot: Botler);
    start(): Promise<this>;
    stop(): Promise<this>;
    send<U extends User, M extends Message.Message>(user: U, message: M): Promise<this>;
}
