import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Delivery, Payment, StatusHistory } from 'src/order/models';
import { Cart as CartEntity } from './Cart.entity';
import { CartItem as CartItemEntity } from './CartItem.entity';
import { User as UserEntity } from './User.entity';

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

  @Column({ type: 'jsonb', name: 'status_history' })
  statusHistory: StatusHistory[];

  @Column()
  total: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CartEntity, (cart) => cart.orders)
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.order)
  @JoinColumn({ name: 'cart_id' })
  items: CartItemEntity[];
}
