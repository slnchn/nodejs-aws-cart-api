import { Body, Controller, Delete, Get, Param, Put, Req } from '@nestjs/common';

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

  // get order by id
  @Get(':id')
  async getOrder(@Param('id') id) {
    const order = await this.orderService.findById(id);

    return {
      statusCode: 200,
      message: 'OK',
      data: order,
    };
  }

  @Put(':id/status')
  async updateOrderStatus(@Param('id') id, @Body() body) {
    const order = await this.orderService.findById(id);

    const updatedStatusHistory = [
      ...order.statusHistory,
      {
        status: body.status,
        timestamp: new Date(),
        comment: body.comment,
      },
    ];

    const updatedOrder = await this.orderService.update(id, {
      status: body.status,
      statusHistory: updatedStatusHistory,
    });

    return {
      statusCode: 200,
      message: 'OK',
      data: updatedOrder,
    };
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id) {
    const order = await this.orderService.delete(id);

    return {
      statusCode: 200,
      message: 'OK',
      data: order,
    };
  }
}
