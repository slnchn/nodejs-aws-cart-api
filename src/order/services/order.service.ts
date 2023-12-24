import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Order as OrderEntity } from '../../entities/Order.entity';
import { Cart as CartEntity } from '../../entities/Cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
  ) {}

  async findById(orderId: string) {
    try {
      const order = await this.ordersRepository.findOne({
        where: { id: orderId },
        relations: ['items'],
      });

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

  async completeCheckout(orderData: object) {
    const queryRunner =
      this.ordersRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await queryRunner.manager.save(OrderEntity, orderData);
      await queryRunner.manager.update(CartEntity, order.cart_id, {
        status: 'ORDERED',
      });

      await queryRunner.commitTransaction();

      return order;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      return null;
    } finally {
      await queryRunner.release();
    }
  }
}
