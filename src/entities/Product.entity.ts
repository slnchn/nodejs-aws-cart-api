import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { CartItem as CartItemEntity } from './CartItem.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  count: number;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product)
  @JoinColumn({ name: 'id' })
  cartItems: CartItemEntity[];
}
