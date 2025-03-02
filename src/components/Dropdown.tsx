import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  useRef,
} from 'react';
import {createPortal} from 'react-dom';
import {Transition} from 'react-transition-group';
import s from './style.module.css';
import cn from 'classnames';

interface IDropdownContext {
  open: boolean;
  handleOpen: () => void;
}

interface DropdownTriggerProps {
  children: (props: {onClick: () => void}) => ReactElement;
}

interface DropdownItemProps {
  onClick: () => void;
  children: ReactElement | string;
}

const DropdownContext = createContext<IDropdownContext | null>(null);

const DropdownProvider = DropdownContext.Provider;

function useDropdown() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('useHandlers must be used within a ListenerProvider');
  }

  return context;
}

function Dropdown({children}: {children: ReactNode}) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const value = useMemo(() => {
    return {open, handleOpen};
  }, [open, handleOpen]);

  return <DropdownProvider value={value}>{children}</DropdownProvider>;
}

function DropdownTrigger({children}: DropdownTriggerProps) {
  const {handleOpen} = useDropdown();

  return children({onClick: handleOpen});
}

function DropdownMenu({children}: {children: ReactNode}) {
  const {open} = useDropdown();
  const menuRef = useRef(null);

  return (
    <Transition
      in={open}
      nodeRef={menuRef}
      timeout={{
        enter: 0,
        exit: 400
      }}
      mountOnEnter
      unmountOnExit
    >
      {(state) =>
        createPortal(
          <ul
            ref={menuRef}
            className={cn(s.menu, s[`menu-${state}`])}
          >
            {children}
          </ul>,
          document.body
        )
      }
    </Transition>
  );
}

function DropdownItem({onClick, children}: DropdownItemProps) {
  return (
    <li
      className={s.item}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

Dropdown.Menu = DropdownMenu;
Dropdown.Trigger = DropdownTrigger;
Dropdown.Item = DropdownItem;

export default Dropdown;
