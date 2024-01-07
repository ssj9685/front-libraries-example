import { todoQuery } from "@/api/todos";

const TodoList = () => {
  const { data } = todoQuery.useFindAll();
  const { mutate: updateTodo } = todoQuery.useUpdate();
  const { mutate: removeTodo } = todoQuery.useRemove();

  if (!data) return "Loading...";

  return (
    <div className="text-center">
      <div className="w-[100%] flex gap-8 max-w-[320px]">
        <div className="w-[100px]">ID</div>
        <div className="w-[80px]">TITLE</div>
        <div className="w-[80px]">COMPLETED</div>
        <div className="w-[80px]" />
      </div>
      {data.items.map((d) => (
        <div className="w-[100%] flex gap-8 max-w-[320px]" key={d.todoId}>
          <div className="w-[100px] text-ellipsis whitespace-nowrap overflow-hidden">
            {d.todoId}
          </div>
          <div className="w-[80px]">{d.title}</div>
          <input
            type="checkbox"
            className="w-[80px]"
            onChange={(e) => {
              const completed = e.target.checked;
              updateTodo({
                todoId: d.todoId,
                completed,
              });
            }}
            defaultChecked={d.completed}
          />
          <button
            onClick={() => {
              removeTodo(d.todoId);
            }}
          >
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
