import { fetchIncompleteToDos } from "@/app/lib/data";
import { completeToDo } from "../lib/actions";
import CompleteItem from "./tacking/completeItem";

export default async function Todos() {
  const todoList = await fetchIncompleteToDos();

  const todoRender = todoList.map((todo) => {
    return (
      <div key={todo.id} className="flex whitespace-nowrap">
        <form
          action={completeToDo}
          className="w-5 flex-none h-5 border mr-1 mb-2 "
        >
          <input
            readOnly
            type="text"
            name="complete"
            value={todo.complete.toString()}
            className="hidden"
          />
          <input
            readOnly
            className="hidden"
            type="text"
            name="id"
            value={todo.id}
          />
          <CompleteItem completed={todo.complete} />
        </form>
        {todo.description}
      </div>
    );
  });

  return (
    <div className="p-5 pb-10 text-sm border min-w-fit max-w-[280px] w-1/3 h-full">
      <div className="flex place-content-center font-semibold pb-5">
        To Do List
      </div>
      <div className="max-h-full overflow-scroll">{todoRender}</div>
    </div>
  );
}
