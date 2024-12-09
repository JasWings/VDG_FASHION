import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';
export class RefundsService {
  create(createRefundDto: CreateRefundDto) {
    // Implement your logic to create a refund here
    return 'This action adds a new refund';
  }

  findAll() {
    // Implement your logic to find all refunds here
    return {
      data: [],
    };
  }

  findOne(id: number) {
    // Implement your logic to find a refund by ID here
    return `This action returns a #${id} refund`;
  }

  update(id: number, updateRefundDto: UpdateRefundDto) {
    // Implement your logic to update a refund here
    return `This action updates a #${id} refund`;
  }

  remove(id: number) {
    // Implement your logic to remove a refund here
    return `This action removes a #${id} refund`;
  }
}
