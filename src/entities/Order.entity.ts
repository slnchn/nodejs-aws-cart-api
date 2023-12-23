import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

import { Delivery, Payment } from 'src/order';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryColumn()
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

  items: any[];
}
