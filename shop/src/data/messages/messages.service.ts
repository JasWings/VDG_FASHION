import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import MessagesJson from '../db/pickbazar/messages.json';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetConversationsDto } from '../conversations/dto/get-conversations.dto';

const messages = plainToClass(Message, MessagesJson);

export class MessagesService {
  private messages: Message[] = messages;

  createMessage(createMessageDto: CreateMessageDto) {
    return this.messages[0];
  }

  getMessages({ search, limit, page }: GetConversationsDto) {
    const data: Message[] = this.messages;
    return {
      data: data,
    };
  }
}
