import { Todo, TodosService } from './todos.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get()
    findAll(): Todo[] {
        return this.todosService.findAll(); // Lấy danh sách todos
    }

    @Post()
    create(@Body() todo: Todo): void {
        // Đảm bảo rằng todo có định dạng đúng và thêm vào danh sách
        this.todosService.create(todo);  // Tạo mới một todo
    }

    // @Delete(':id')
    // delete(@Param('id') id: number): void {  // Chỉ cần void, không cần trả về Todo[]
    //     console.log('Received id to delete:', id);
    //     this.todosService.delete(id);  // Gọi phương thức delete trong service
    // }

    @Delete(':id')
    delete(@Param('id') id: string): void {
        const numericId = Number(id); // Chuyển id sang kiểu number
        console.log('Received id to delete:', numericId);
        this.todosService.delete(numericId);  // Gọi phương thức delete trong service
    }
}
