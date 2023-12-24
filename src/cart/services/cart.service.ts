import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Cart as CartEntity } from 'src/entities/Cart.entity';
import { Cart, CartStatuses } from '../models';

@Injectable()
export class CartService {
  @InjectRepository(CartEntity)
  private cartsRepository: Repository<CartEntity>;

  async findByUserId(userId: string) {
    try {
      const cart = await this.cartsRepository.findOne({
        where: { user_id: userId },
        relations: ['items'],
      });

      if (cart) {
        return { ...cart, items: [] };
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createByUserId(userId: string) {
    const id = v4();
    const userCart = {
      id,
      user_id: userId,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
      status: CartStatuses.OPEN,
    };

    await this.cartsRepository.insert(userCart);
    return { ...userCart, items: [] };
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);
    if (userCart) {
      return userCart as Cart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    };

    await this.cartsRepository.save(updatedCart);

    return { ...updatedCart };
  }

  async removeByUserId(userId) {
    await this.cartsRepository.delete({ user_id: userId });
  }
}
