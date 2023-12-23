import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cart } from './Cart.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
  @PrimaryColumn()
  cart_id: string;

  @PrimaryColumn()
  product_id: string;

  @Column()
  count: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}
