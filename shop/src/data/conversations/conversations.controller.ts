import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import {
  ConversationPaginator,
  GetConversationsDto,
} from './dto/get-conversations.dto';

export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  createConversation(createConversationDto: CreateConversationDto) {
    return this.conversationsService.create(createConversationDto);
  }

  getConversations(query: GetConversationsDto): Promise<ConversationPaginator> {
    return this.conversationsService.getAllConversations(query);
  }

  getStoreNotice(param: string) {
    return this.conversationsService.getConversation(param);
  }
}
