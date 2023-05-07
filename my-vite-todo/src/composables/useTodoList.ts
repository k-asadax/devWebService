import { ref } from 'vue';
import { TodoTask } from '../composables/todoTask';
export const useTodoList = (id: number): { idx: number, todo: TodoTask} => {
    const ls = localStorage.todoList;
    const todoTaskList: TodoTask[] = ls ? JSON.parse(ls) : [];
    const todoListRef = ref(todoTaskList);
    const todo: TodoTask = todoListRef.value.find((todo) => todo.id === id) as TodoTask;
    const idx: number = todoListRef.value.findIndex((todo) => todo.id === id);
    return { idx, todo };
}