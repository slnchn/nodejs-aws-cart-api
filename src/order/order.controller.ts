import { Controller, Get } from '@nestjs/common';

import { OrderService } from './services';

@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getOrders() {
    const orders = await this.orderService.findAll();

    return {
      statusCode: 200,
      message: 'OK',
      data: orders,
    };
  }
}
