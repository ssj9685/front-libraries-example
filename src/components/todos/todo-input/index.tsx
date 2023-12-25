import { FormEvent } from "react";
import { todoQuery } from "@/api/todos";

const TodoInput = () => {
  const { mutate, isPending, isSuccess, isError } = todoQuery.useCreate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as { title: string };

    mutate({
      title: data.title,
      completed: false,
    });
  };

  return (
    <div>
      <form className="mb-8" onSubmit={handleSubmit}>
        <input
          name="title"
          style={{ color: "black" }}
          type="text"
          autoComplete="off"
        />
        <button className="bg-slate-600">Add todo</button>
      </form>
      {isPending && <p>Making request...</p>}
      {isSuccess && <p>Todo added!</p>}
      {isError && <p>There was an error!</p>}
    </div>
  );
};

export default TodoInput;
