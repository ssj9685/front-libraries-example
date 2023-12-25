import React from "react";
import { todoQuery } from "@/api/todos";
import TodoList from "@/components/todos/todo-list";
import TodoInput from "@/components/todos/todo-input";

function RepoDataPage() {
  todoQuery.useFindAll();

  return (
    <>
      <TodoInput />
      <TodoList />
    </>
  );
}

export default RepoDataPage;
