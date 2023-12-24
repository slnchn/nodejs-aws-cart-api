import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Delivery, Payment } from 'src/order/models';
import { CartItem as CartItemEntity } from './CartItem.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  cart_id: string;

  @Column({ type: 'jsonb' })
  payment: Payment;

  @Column({ type: 'jsonb' })
  delivery: Delivery;

  @Column()
  comments: string;

  @Column()
  status: string;

  @Column()
  total: number;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.order)
  @JoinColumn({ name: 'cart_id' })
  items: CartItemEntity[];
}
