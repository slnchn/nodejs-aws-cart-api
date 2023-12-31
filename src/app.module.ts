import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

// entities
import { CartItem as CartItemEntity } from './entities/CartItem.entity';
import { Cart as CartEntity } from './entities/Cart.entity';
import { Order as OrderEntity } from './entities/Order.entity';
import { User as UserEntity } from './entities/User.entity';
import { Product as ProductEntity } from './entities/Product.entity';

// config
import { config } from './config';

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      entities: [
        CartItemEntity,
        CartEntity,
        OrderEntity,
        UserEntity,
        ProductEntity,
      ],
      synchronize: false,

      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
