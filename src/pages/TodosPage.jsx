import { useCallback, useEffect, useReducer } from "react";
import TodoForm from "../features/Todos/TodoForm";
import TodoList from "../features/Todos/TodoList/TodoList";
import SortBy from "../shared/SortBy";
import FilterInput from "../shared/FilterInput";
import useDebounce from "../utils/useDebounce";
import {
  TODO_ACTIONS,
  initialTodoState,
  todoReducer,
} from "../reducers/todoReducer";
import { useAuth } from "../reducers/contexts/AuthContext";
import { useSearchParams } from "react-router";
import StatusFilter from "../shared/StatusFilter";
import styles from "../App.module.css";

export default function TodosPage() {
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;

  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  const handleFilterChange = (newTerm) => {
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: { filterTerm: newTerm },
    });
  };

  const invalidateCache = useCallback(() => {
    dispatch({
      type: TODO_ACTIONS.INVALIDATE_CACHE,
    });
  }, []);

  useEffect(() => {
    if (!token) return;

    async function fetchTodos() {
      dispatch({ type: TODO_ACTIONS.FETCH_START });

      try {
        const paramsObject = {
          sortBy,
          sortDirection,
        };

        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }

        const params = new URLSearchParams(paramsObject);

        const response = await fetch(`/api/tasks?${params}`, {
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        });

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: { todoList: data.tasks },
        });
      } catch (error) {
        const isFilterError =
          debouncedFilterTerm ||
          sortBy !== "creationDate" ||
          sortDirection !== "desc";

        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message: isFilterError
              ? `Error filtering/sorting todos: ${error.message}`
              : `Error fetching todos: ${error.message}`,
            isFilterError,
          },
        });
      }
    }

    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  async function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: { newTodo },
    });

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: todoTitle,
          isCompleted: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const savedTodo = await response.json();

      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          tempId: newTodo.id,
          savedTodo,
        },
      });

      invalidateCache();
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          tempId: newTodo.id,
          message: error.message,
        },
      });
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);

    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: { updatedTodoList },
    });

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: originalTodo.title,
          isCompleted: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to complete todo");
      }

      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
      });

      invalidateCache();
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          originalTodo,
          message: error.message,
        },
      });
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return editedTodo;
      }

      return todo;
    });

    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: { updatedTodos },
    });

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
      });

      invalidateCache();
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          originalTodo,
          message: error.message,
        },
      });
    }
  }

  return (
    <main className={styles["todo-board"]}>
      {error && (
        <div>
          <p>{error}</p>
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: TODO_ACTIONS.CLEAR_ERROR,
              })
            }
          >
            Clear Error
          </button>
        </div>
      )}
      {filterError && (
        <div>
          <p>{filterError}</p>

          <button
            type="button"
            onClick={() =>
              dispatch({
                type: TODO_ACTIONS.CLEAR_FILTER_ERROR,
              })
            }
          >
            Clear Filter Error
          </button>

          <button
            type="button"
            onClick={() =>
              dispatch({
                type: TODO_ACTIONS.RESET_FILTERS,
              })
            }
          >
            Reset Filters
          </button>
        </div>
      )}
      {isTodoListLoading && todoList.length === 0 && <p>Loading todos...</p>}
      <h2 className={styles["section-title"]}>Today&apos;s Tasks</h2>

      <section className={styles["control-panel"]}>
        <h3>Organize Tasks</h3>

        <div className={styles["control-grid"]}>
          <SortBy
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortByChange={(newSortBy) =>
              dispatch({
                type: TODO_ACTIONS.SET_SORT,
                payload: {
                  sortBy: newSortBy,
                  sortDirection,
                },
              })
            }
            onSortDirectionChange={(newDirection) =>
              dispatch({
                type: TODO_ACTIONS.SET_SORT,
                payload: {
                  sortBy,
                  sortDirection: newDirection,
                },
              })
            }
          />

          <StatusFilter />

          <FilterInput
            filterTerm={filterTerm}
            onFilterChange={handleFilterChange}
          />
        </div>
      </section>

      <section className={styles["add-task-panel"]}>
        <h3>Add New Task</h3>
        <TodoForm onAddTodo={addTodo} />
      </section>

      <section className={styles["task-list-panel"]}>
        <h3>Task List</h3>

        <TodoList
          todoList={todoList}
          onCompleteTodo={completeTodo}
          onUpdateTodo={updateTodo}
          dataVersion={dataVersion}
          statusFilter={statusFilter}
        />
      </section>
    </main>
  );
}
