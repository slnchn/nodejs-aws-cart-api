import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

import { Order as OrderEntity } from './Order.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => OrderEntity, (order) => order.user)
  @JoinColumn({ name: 'id' })
  orders: OrderEntity[];
}
