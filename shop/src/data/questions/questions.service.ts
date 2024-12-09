import { Injectable } from '@nestjs/common';
import { paginate } from '../common/pagination/paginate';
import { GetQuestionDto } from './dto/get-questions.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  private questions: Question[] = [];

  findAllQuestions({ limit, page, search, answer, product_id }: GetQuestionDto) {
    if (!page) page = 1;
    if (!limit) limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Question[] = this.questions;

    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // Implement your search logic here
      }
    }

    if (product_id) {
      data = data.filter((p) => p.product_id === Number(product_id));
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/questions?search=${search}&answer=${answer}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  findQuestion(id: number) {
    return this.questions.find((p) => p.id === id);
  }

  create(createQuestionDto: CreateQuestionDto) {
    // Implement your create logic here
    return this.questions[0];
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    // Implement your update logic here
    return this.questions[0];
  }

  delete(id: number) {
    // Implement your delete logic here
    return this.questions[0];
  }
}
