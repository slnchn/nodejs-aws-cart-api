import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

import { CartItem } from './CartItem.entity';

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

  @OneToMany(() => CartItem, (cartItems) => cartItems.cart)
  @JoinColumn({ name: 'id' })
  items: CartItem[];
}
