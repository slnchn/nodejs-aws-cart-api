import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Order as OrderEntity } from '../../entities/Order.entity';

@Injectable()
export class OrderService {
  @InjectRepository(OrderEntity)
  private ordersRepository: Repository<OrderEntity>;

  async findById(orderId: string) {
    try {
      const order = await this.ordersRepository.findOne({
        where: { id: orderId },
        relations: ['items'],
      });

      console.log(order);

      return order;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(data: any) {
    const id = v4();
    const order = {
      ...data,
      id,
      status: 'inProgress',
    };

    await this.ordersRepository.insert(order);

    return order;
  }

  async update(orderId, data) {
    const order = await this.findById(orderId);
    if (!order) {
      throw new Error('Order does not exist.');
    }

    await this.ordersRepository.save({
      ...data,
      id: orderId,
    });
  }
}
