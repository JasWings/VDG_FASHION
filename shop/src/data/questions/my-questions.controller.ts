import { Request, Response } from 'express'; // Import Express types or use your preferred request and response types
import { GetQuestionDto } from './dto/get-questions.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { MyQuestionsService } from './my-questions.service';

class MyQuestionsController {
  private myQuestionService: MyQuestionsService; // Initialize your service here

  constructor(myQuestionService: MyQuestionsService) {
    this.myQuestionService = myQuestionService;
  }

  findAll = async (req: Request, res: Response) => {
    const query: GetQuestionDto = req.query;
    const myQuestions = await this.myQuestionService.findMyQuestions(query);
    res.json(myQuestions);
  }

  find = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const myQuestion = await this.myQuestionService.findMyQuestion(+id);
    res.json(myQuestion);
  }

  create = async (req: Request, res: Response) => {
    const createQuestionDto: CreateQuestionDto = req.body;
    const createdMyQuestion = await this.myQuestionService.create(createQuestionDto);
    res.json(createdMyQuestion);
  }

  update = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const updateQuestionDto: UpdateQuestionDto = req.body;
    const updatedMyQuestion = await this.myQuestionService.update(+id, updateQuestionDto);
    res.json(updatedMyQuestion);
  }

  delete = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    await this.myQuestionService.delete(+id);
    res.sendStatus(204); // No Content
  }
}

export default MyQuestionsController;
