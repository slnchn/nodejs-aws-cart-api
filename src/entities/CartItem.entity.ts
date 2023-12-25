import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { Cart as CartEntity } from './Cart.entity';
import { Order as OrderEntity } from './Order.entity';
import { Product as ProductEntity } from './Product.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
  @PrimaryColumn()
  cart_id: string;

  @PrimaryColumn()
  product_id: string;

  @Column()
  count: number;

  @ManyToOne(() => ProductEntity, (product) => product.cartItems)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => CartEntity, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  @JoinColumn({ name: 'cart_id' })
  order: OrderEntity;
}
