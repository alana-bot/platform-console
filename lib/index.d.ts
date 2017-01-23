/// <reference types="bluebird" />
import { PlatformMiddleware } from 'botler/lib/types/platform';
import { Message } from 'botler/lib/types/bot';
import { User, BasicUser } from 'botler/lib/types/user';
import * as Promise from 'bluebird';
import Botler from 'botler';
export default class Console implements PlatformMiddleware {
    private rl;
    protected theUser: BasicUser;
    protected bot: Botler;
    constructor(bot: Botler);
    start(): Promise<this>;
    stop(): Promise<this>;
    send<U extends User, M extends Message.Message>(user: U, message: M): Promise<this>;
}
