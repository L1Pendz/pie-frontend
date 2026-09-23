import {
  createContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { Pie } from "../types";

interface State {
  pies: Pie[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Pie[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "ADD_PIE"; payload: Pie };

const initialState: State = {
  pies: [],
  loading: false,
  error: null,
};

const pieReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, pies: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_PIE":
      return { ...state, pies: [...state.pies, action.payload] };
    default:
      return state;
  }
};

export const PieContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

export const PieProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(pieReducer, initialState);

  return (
    <PieContext.Provider value={{ state, dispatch }}>
      {children}
    </PieContext.Provider>
  );
};
