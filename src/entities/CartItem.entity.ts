import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Cart as CartEntity } from './Cart.entity';
import { Order } from './Order.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
  @PrimaryColumn()
  cart_id: string;

  @PrimaryColumn()
  product_id: string;

  @Column()
  count: number;

  @ManyToOne(() => CartEntity, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'cart_id' })
  order: Order;
}
