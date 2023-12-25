import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

import { CartItem as CartItemEntity } from './CartItem.entity';
import { Order as OrderEntity } from './Order.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column({ enum: ['OPEN', 'ORDERED'] })
  status: string;

  @OneToMany(() => OrderEntity, (cartItems) => cartItems.cart)
  @JoinColumn({ name: 'id' })
  orders: OrderEntity[];

  @OneToMany(() => CartItemEntity, (cartItems) => cartItems.cart)
  @JoinColumn({ name: 'id' })
  items: CartItemEntity[];
}
