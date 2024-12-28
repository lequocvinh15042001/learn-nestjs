import { Injectable } from '@nestjs/common';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

@Injectable()
export class TodosService {
    private todos: Todo[] = [];

    findAll(): Todo[] {
        return this.todos;
    }

    create(todo: Todo): void {
        this.todos.push(todo);
    }

    delete(id: number): void {
        console.log('Before delete:', this.todos);
        this.todos = this.todos.filter(todo => todo.id !== id);  // Xóa todo theo id
        console.log('After delete:', this.todos);
    }
    
}
