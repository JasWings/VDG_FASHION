import { Injectable } from '@nestjs/common';
import { paginate } from '../common/pagination/paginate';
import { Question } from './entities/question.entity';
import { GetQuestionDto } from './dto/get-questions.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class MyQuestionsService {
  private myQuestions: Question[] = [];

  findMyQuestions({ limit, page, search, answer }: GetQuestionDto) {
    if (!page) page = 1;
    if (!limit) limit = 8;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Question[] = this.myQuestions;

    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // Implement your search logic here
      }
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/my-questions?with=user&orderBy=created_at&sortedBy=desc`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  findMyQuestion(id: number) {
    return this.myQuestions.find((p) => p.id === id);
  }

  create(createQuestionDto: CreateQuestionDto) {
    // Implement your create logic here
    return this.myQuestions[0];
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    // Implement your update logic here
    return this.myQuestions[0];
  }

  delete(id: number) {
    // Implement your delete logic here
    return this.myQuestions[0];
  }
}
