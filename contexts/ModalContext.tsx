import { createContext, ReactNode, useContext, useReducer } from "react";

interface IModalState {
  content: ReactNode;
  opened: boolean;
}
const initialState = {
  content: <></> as ReactNode,
  opened: false,
};
const reducer = (state: IModalState, action: { type: string; payload?: ReactNode; }) => {
  const { type, payload } = action;
  switch (type) {
    case 'TOGGLE':
      return { ...state, opened: !state.opened };
    case 'SET_CONTENT':
      return { ...state, opened: true, content: payload };
    default:
      return state;
  };
};

export const ModalProvider = ({ children }: { children: ReactNode; }) => {
  const [modalState, dispatch] = useReducer(reducer, initialState);

  const openModal = (content: ReactNode): void => dispatch({ type: "SET_CONTENT", payload: content });

  const toggleModal = (): void => dispatch({ type: 'TOGGLE' });

  return <ModalContext.Provider value={{
    content: modalState.content,
    opened: modalState.opened,
    openModal,
    toggleModal,
  }}>
    {children}
  </ModalContext.Provider>;
};

export const useModal = () => useContext(ModalContext);

const ModalContext = createContext({
  content: <></> as ReactNode,
  opened: false,
  openModal: (content: ReactNode) => {},
  toggleModal: () => {},
});
