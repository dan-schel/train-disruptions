import React, { useState } from "react";

export function TodoList({
  initialTodoItems,
}: {
  initialTodoItems: { text: string }[];
}) {
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const [newTodo, setNewTodo] = useState("");
  return (
    <>
      <ul>
        {todoItems.map((todoItem, index) => (
          // biome-ignore lint:
          <li key={index}>{todoItem.text}</li>
        ))}
      </ul>
      <div>
        <form
          onSubmit={async (ev) => {
            ev.preventDefault();

            // Optimistic UI update
            setTodoItems((prev) => [...prev, { text: newTodo }]);
            try {
              const response = await fetch("/api/todo/create", {
                method: "POST",
                body: JSON.stringify({ text: newTodo }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              await response.blob();
              setNewTodo("");
            } catch (e) {
              console.error(e);
              // rollback
              setTodoItems((prev) => prev.slice(0, -1));
            }
          }}
        >
          <input
            type="text"
            onChange={(ev) => setNewTodo(ev.target.value)}
            value={newTodo}
            className={
              "mb-1 mr-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:w-auto"
            }
          />
          <button
            type="submit"
            className={
              "w-full rounded-lg bg-blue-700 p-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 sm:w-auto"
            }
          >
            Add to-do
          </button>
        </form>
      </div>
    </>
  );
}
