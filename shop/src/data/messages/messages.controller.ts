import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

export async function createMessage(createMessageDto: CreateMessageDto) {
  try {
    // Call the MessagesService to create the message
    return await MessagesService.createMessage(createMessageDto);
  } catch (error) {
    // Handle errors
    throw new Error('Failed to create a message');
  }
}

export async function getMessages(query: any) {
  try {
    // Call the MessagesService to get messages
    return await MessagesService.getMessages(query);
  } catch (error) {
    // Handle errors
    throw new Error('Failed to retrieve messages');
  }
}
