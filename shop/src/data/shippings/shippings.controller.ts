import { ShippingsService } from './shippings.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { GetShippingsDto } from './dto/get-shippings.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

export class ShippingsController {
  private readonly shippingsService: ShippingsService;

  constructor(shippingsService: ShippingsService) {
    this.shippingsService = shippingsService;
  }

  create(createShippingDto: CreateShippingDto) {
    return this.shippingsService.create(createShippingDto);
  }

  findAll(query: GetShippingsDto) {
    return this.shippingsService.getShippings(query);
  }

  findOne(id: string) {
    return this.shippingsService.findOne(+id);
  }

  update(id: string, updateShippingDto: UpdateShippingDto) {
    return this.shippingsService.update(+id, updateShippingDto);
  }

  remove(id: string) {
    return this.shippingsService.remove(+id);
  }
}
