import { Request, Response } from 'express'; // Import Express types or use your preferred request and response types
import { GetQuestionDto } from './dto/get-questions.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';

class QuestionController {
  private questionService: QuestionService; // Initialize your service here

  constructor(questionService: QuestionService) {
    this.questionService = questionService;
  }

  findAll = async (req: Request, res: Response) => {
    const query: GetQuestionDto = req.query;
    const questions = await this.questionService.findAllQuestions(query);
    res.json(questions);
  }

  find = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const question = await this.questionService.findQuestion(+id);
    res.json(question);
  }

  create = async (req: Request, res: Response) => {
    const createQuestionDto: CreateQuestionDto = req.body;
    const createdQuestion = await this.questionService.create(createQuestionDto);
    res.json(createdQuestion);
  }

  update = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const updateQuestionDto: UpdateQuestionDto = req.body;
    const updatedQuestion = await this.questionService.update(+id, updateQuestionDto);
    res.json(updatedQuestion);
  }

  delete = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    await this.questionService.delete(+id);
    res.sendStatus(204); // No Content
  }
}

export default QuestionController;
