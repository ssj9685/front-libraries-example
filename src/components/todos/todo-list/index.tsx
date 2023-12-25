import { todoQuery } from "@/api/todos";

const TodoList = () => {
  const data = todoQuery.useGet();

  if (!data) return "Loading...";

  return (
    <div className="text-center">
      <div className="w-[100%] flex gap-8 max-w-[320px]">
        <div className="w-[100px]">ID</div>
        <div className="w-[80px]">TITLE</div>
        <div className="w-[80px]">COMPLETED</div>
      </div>
      {data.items.map((d) => (
        <div className="w-[100%] flex gap-8 max-w-[320px]" key={d.todoId}>
          <div className="w-[100px] text-ellipsis whitespace-nowrap overflow-hidden">
            {d.todoId}
          </div>
          <div className="w-[80px]">{d.title}</div>
          <div className="w-[80px]">{d.completed.toString()}</div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
