import { create } from "zustand";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const useTodoForm = create<TodoState>((set) => ({
  todos: [],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

export default useTodoForm;

// import { create } from "zustand";

// interface UserInfoT {
//   id: string;
//   email: string;
// }

// interface AppStateT {
//   // User State
//   userInfo: UserInfoT | null;
//   // Set the user info
//   setUserInfo: (userInfo: UserInfoT) => void;
//   // Reset the state
//   resetState: () => void;
// }

// const useAppState = create<AppStateT>((set) => ({
//   userInfo: null,
//   setUserInfo: (userInfo: UserInfoT) => set({ userInfo }),
//   resetState: () => set({ userInfo: null }),
// }));

// export default useAppState;
