import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module'; // Nhập module Todos

@Module({
  imports: [TodosModule],  // Đảm bảo TodosModule được import vào đây
})
export class AppModule {}
