import { CreateAiDto } from './dto/create-ai.dto';
import { createAi } from './ai.service';

export function createAiDescriptionRoute(createAiDto: CreateAiDto) {
  return createAi(createAiDto);
}
