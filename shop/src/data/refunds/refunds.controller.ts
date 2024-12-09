import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';
import { RefundsService } from './refunds.service';

export function createRefund(refundsService: RefundsService, createRefundDto: CreateRefundDto) {
  return refundsService.create(createRefundDto);
}

export function findAllRefunds(refundsService: RefundsService) {
  return refundsService.findAll();
}

export function findRefundById(refundsService: RefundsService, id: string) {
  return refundsService.findOne(+id);
}

export function updateRefund(refundsService: RefundsService, id: string, updateRefundDto: UpdateRefundDto) {
  return refundsService.update(+id, updateRefundDto);
}

export function removeRefund(refundsService: RefundsService, id: string) {
  return refundsService.remove(+id);
}
