import { CreateAiDto } from './dto/create-ai.dto';
import { Ai } from './entities/ai.entity';

export function createAi(createAiDto: CreateAiDto): Ai {
  return {
    status: 'success',
    result: 'This is a dummy response for a dummy API.',
  };
}
