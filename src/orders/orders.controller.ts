import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ORDER_SERVICE } from 'src/config/services';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}
  @Post()
  createProducts(@Body() createOrderDto: any) {
    return this.ordersClient
      .send({ cmd: 'create_orders' }, { ...createOrderDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.ordersClient.send({ cmd: 'find_all_orders' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.ordersClient.send({ cmd: 'find_one_orders' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersClient.send({ cmd: 'delete_orders' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() createOrderDto: any) {
    return this.ordersClient
      .send({ cmd: 'update_orders' }, { id, ...createOrderDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
