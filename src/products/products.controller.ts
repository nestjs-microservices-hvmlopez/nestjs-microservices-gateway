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
import { CreateProductDto } from 'src/common/dto/create-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateProductDto } from 'src/common/dto/update-product.dto';
import { PRODUCT_SERVICE } from 'src/config/services';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}
  @Post()
  createProducts(@Body() createProductDto: CreateProductDto) {
    return this.productsClient
      .send({ cmd: 'create_product' }, { ...createProductDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDtop: UpdateProductDto) {
    return this.productsClient
      .send({ cmd: 'update_product' }, { id, ...updateProductDtop })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
