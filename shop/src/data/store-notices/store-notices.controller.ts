import { GetUsersDto } from '../users/dto/get-users.dto';
import { UsersService } from '../users/users.service';
import { CreateStoreNoticeDto } from './dto/create-store-notice.dto';
import { GetStoreNoticesDto } from './dto/get-store-notices.dto';
import { UpdateStoreNoticeDto } from './dto/update-store-notice.dto';
import { StoreNoticesService } from './store-notices.service';

class StoreNoticesController {
  private readonly storeNoticesService: StoreNoticesService;
  private readonly usersService: UsersService;

  constructor(
    storeNoticesService: StoreNoticesService,
    usersService: UsersService,
  ) {
    this.storeNoticesService = storeNoticesService;
    this.usersService = usersService;
  }

  public async createStoreNotice(createStoreNoticeDto: CreateStoreNoticeDto) {
    return this.storeNoticesService.create(createStoreNoticeDto);
  }

  public async getStoreNotices(query: GetStoreNoticesDto) {
    return this.storeNoticesService.getStoreNotices(query);
  }

  public async getAllUsers(query: GetUsersDto) {
    return this.usersService.getUsersNotify(query);
  }

  public async getStoreNotice(param: string, language: string) {
    return this.storeNoticesService.getStoreNotice(param, language);
  }

  public async update(id: string, updateStoreNoticeDto: UpdateStoreNoticeDto) {
    return this.storeNoticesService.update(+id, updateStoreNoticeDto);
  }

  public async deleteStoreNotice(id: string) {
    return this.storeNoticesService.remove(+id);
  }
}

export default StoreNoticesController;
