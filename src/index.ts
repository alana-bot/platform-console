import * as readline from 'readline';
import * as Promise from 'bluebird';

import { PlatformMiddleware } from '@alana/core/lib/types/platform';
import { Message } from '@alana/core/lib/types/bot';
import * as Bot from '@alana/core/lib/types/bot';
import { User, BasicUser } from '@alana/core/lib/types/user';
import { GreetingMessage } from '@alana/core/lib/types/message';

import Botler from '@alana/core';

export default class Console implements PlatformMiddleware {
  private rl: readline.ReadLine;
  protected theUser: BasicUser;
  protected bot: Botler;

  constructor(bot: Botler) {
    this.bot = bot;
    bot.addPlatform(this);
  }

  public start() {
    // usually start listening on a port here
    // reset user
    this.theUser = {
      id: `0`,
      platform: 'console',
      _platform: this,
    };
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const greeting: GreetingMessage = {
      type: 'greeting',
    };
    this.bot.processMessage(this.theUser, greeting)

    this.rl.on('line', (input: string) => {
      console.log(`<- "${input}"`);
      const message: Bot.IncomingMessage = {
        type: 'text',
        text: input,
      };
      this.bot.processMessage(this.theUser, message);
    });
    return Promise.resolve(this);
  }

  public stop() {
    this.rl.close();
    this.rl = null;
    // usually stop listening here
    return Promise.resolve(this);
  }

  public send<U extends User, M extends Message.Message>(user: U, message: M) {
    switch (message.type) {
      case 'text':
        const textMessage: Message.TextMessage = message as any;
        const text = textMessage.text;
        console.log(`-> ${text}`);
        break;

      default:
        console.log(`->`, message);
        break;
    }
    return Promise.resolve(this);
  }
}
