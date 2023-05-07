<script setup lang="ts">
    import { ref } from 'vue';
    import { TodoTask } from '../composables/todoTask';
    import { useTodoList} from '../composables/useTodoList';
    const ls = localStorage.todoList;
    const todoTaskList: TodoTask[] = ls ? JSON.parse(ls) : [];
    const todoRef = ref('');
    const todoListRef = ref(todoTaskList);
    const isEditRef = ref(false);
    let editId: number = -1;

    const addTodo = () => {
        const id = new Date().getTime();
        todoListRef.value.push(new TodoTask(id, todoRef.value));
        localStorage.todoList = JSON.stringify(todoListRef.value);
        todoRef.value = '';
    };
    const showTodo = (id: number) => {
        const todoIdx: {idx: number, todo: TodoTask} = useTodoList(id);
        isEditRef.value = true;
        editId = id;
        todoRef.value = todoIdx.todo.task;
    };
    const editTodo = () => {
        const todoIdx: {idx: number, todo: TodoTask} = useTodoList(editId);
        todoIdx.todo.task = todoRef.value;
        todoListRef.value.splice(todoIdx.idx, 1, todoIdx.todo);
        localStorage.todoList = JSON.stringify(todoListRef.value);
        isEditRef.value = false;
        editId = -1;
        todoRef.value = '';
    };
    const deleteTodo = (id: number) => {
        const todoIdx: {idx: number, todo: TodoTask} = useTodoList(id);
        const delMsg: string = '[' + todoIdx.todo.task + ']を削除しますか？'
        if (!confirm(delMsg)) return;
        todoListRef.value.splice(todoIdx.idx, 1);
        localStorage.todoList = JSON.stringify(todoListRef.value);
    }
</script>

<template>
    <div class="box_input">
        <input
            type="text"
            class="todo_input"
            v-model="todoRef"
            placeholder="+ TODOを入力" />
        <button class="btn green" @click="editTodo" v-if="isEditRef">変更</button>
        <button class="btn" @click="addTodo" v-else>追加</button>
    </div>
    <div class="box_list">
        <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">
            <div class="todo">
                <input type="checkbox" class="check" /><label>{{todo.task}}</label>
            </div>
            <div class="btns">
                <button class="btn green" @click="showTodo(todo.id)">編</button>
                <button class="btn pink" @click="deleteTodo(todo.id)">削</button>
            </div>
        </div>
    </div>

</template>

<style scoped>
    .box_input {
        margin-top: 20px;
    }
    .box_list {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .todo_input {
        width: 300px;
        margin-right: 8px;
        padding: 8px;
        font-size: 18px;
        border: 1px solid #aaa;
        border-radius: 6px;
    }
    .todo_list {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .todo {
        border: 1px solid #ccc;
        border-radius: 6px;
        padding: 12px;
        width: 300px;
    }
    .check {
        border: 1px solid red;
        transform: scale(1.6);
        margin: 0 16px 2px 6px;
    }
    .btns{
        display: flex;
        gap: 4px;
    }
    .btn {
        padding: 8px;
        background-color: #03a9f4;
        border-radius: 6px;
        color: #fff;
        text-align: center;
        font-size: 14px;
    }
    .green {
        background-color: #00c853;
    }
    .pink {
        background-color: #ff4081;
    }
</style>