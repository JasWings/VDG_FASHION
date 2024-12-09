import { Request, Response } from "express"; // Import Express types or use your preferred request and response types
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { GetPaymentMethodsDto } from './dto/get-payment-methods.dto';
import { DefaultCart } from './dto/set-default-card.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentMethodService } from './payment-method.service';
import PaymentMethode

class PaymentMethodController {
  private paymentMethodService: PaymentMethodService; // Initialize your service here

  constructor(paymentMethodService: PaymentMethodService) {
    this.paymentMethodService = paymentMethodService;
  }

  create = async (req: Request, res: Response) => {
    const createPaymentMethodDto: CreatePaymentMethodDto = req.body;
    const result = await this.paymentMethodService.create(createPaymentMethodDto);
    res.json(result);
  }

  findAll = async (req: Request, res: Response) => {
    const getPaymentMethodsDto: GetPaymentMethodsDto = req.query;
    const paymentMethods = await this.paymentMethodService.findAll();
    res.json(paymentMethods);
  }

  findOne = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const paymentMethod = await this.paymentMethodService.findOne(+id);
    res.json(paymentMethod);
  }

  update = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const updatePaymentMethodDto: UpdatePaymentMethodDto = req.body;
    const updatedPaymentMethod = await this.paymentMethodService.update(+id, updatePaymentMethodDto);
    res.json(updatedPaymentMethod);
  }

  remove = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    await this.paymentMethodService.remove(+id);
    res.sendStatus(204); // No Content
  }
}

class SavePaymentMethodController {
  private paymentMethodService: PaymentMethodService; // Initialize your service here

  constructor(paymentMethodService: PaymentMethodService) {
    this.paymentMethodService = paymentMethodService;
  }

  savePaymentMethod = async (req: Request, res: Response) => {
    const createPaymentMethodDto: CreatePaymentMethodDto = req.body;
    createPaymentMethodDto.default_card = false;
    const result = await this.paymentMethodService.savePaymentMethod(createPaymentMethodDto);
    res.json(result);
  }
}

class SetDefaultCartController {
  private paymentMethodService: PaymentMethodService; // Initialize your service here

  constructor(paymentMethodService: PaymentMethodService) {
    this.paymentMethodService = paymentMethodService;
  }

  setDefaultCart = async (req: Request, res: Response) => {
    const defaultCart: DefaultCart = req.body;
    const result = await this.paymentMethodService.saveDefaultCart(defaultCart);
    res.json(result);
  }
}

export { PaymentMethodController, SavePaymentMethodController, SetDefaultCartController };
