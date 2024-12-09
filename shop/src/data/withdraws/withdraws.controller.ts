import { CreateWithdrawDto} from './dto/create-withdraw.dto';
import { ApproveWithdrawDto } from './dto/approve-withdraw.dto';
import { GetWithdrawsDto} from './dto/get-withdraw.dto';
import { WithdrawPaginator } from './dto/get-withdraw.dto';
import {
  createWithdraw,
  getWithdraws,
  findOneWithdraw,
  approveWithdraw,
  deleteWithdraw,
} from './withdraws.service';

export function createWithdrawRoute(createWithdrawDto: CreateWithdrawDto) {
  return createWithdraw(createWithdrawDto);
}

export async function getWithdrawsRoute(query: GetWithdrawsDto): Promise<WithdrawPaginator> {
  return getWithdraws(query);
}

export async function getWithdrawRoute(id: string) {
  return findOneWithdraw(+id);
}

export async function approveWithdrawRoute(id: string, updateWithdrawDto: ApproveWithdrawDto) {
  return approveWithdraw(+id, updateWithdrawDto);
}

export async function deleteWithdrawRoute(id: number) {
  return deleteWithdraw(id);
}
