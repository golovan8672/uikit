import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type Handler = () => void;

interface ContextProps {
  addHandler: (handler: Handler) => void;
  removeHandler: Handler;
}

const ListenerContext = createContext<ContextProps | null>(null);

const ListenerProvider = ListenerContext.Provider;

function useHandlers() {
  const context = useContext(ListenerContext);

  if (!context) {
    throw new Error('useHandlers must be used within a ListenerProvider');
  }
  return context;
}

export const AwayListener = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const {addHandler, removeHandler} = useHandlers();

  const addHandlerRef = useRef(addHandler);
  const removeHandlerRef = useRef(removeHandler);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    const removeHandler = removeHandlerRef.current;

    addHandlerRef.current(onCloseRef.current);

    return () => {
      removeHandler();
    };
  }, []);

  return children;
};

export const EscGlobalListener = (props: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const [handlers, setHandler] = useState<Handler[]>([]);

  function addHandler(handler: Handler) {
    setHandler((handlers) => [...handlers, handler]);
  }

  function removeHandler() {
    setHandler((handlers) => handlers.splice(0, handlers.length - 1));
  }

  useEffect(() => {
    function currentHandler(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        handlers[handlers.length - 1]();
      }
    }

    document.addEventListener('keydown', currentHandler);

    return () => {
      document.removeEventListener('keydown', currentHandler);
    };
  }, [handlers]);

  return (
    <ListenerProvider value={{removeHandler, addHandler}}>
      {props.children}
    </ListenerProvider>
  );
};
