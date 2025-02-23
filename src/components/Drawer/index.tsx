import {createPortal} from 'react-dom';
import cn from 'classnames';
import {Transition} from 'react-transition-group';
import s from './Drawer.module.css';
import {useRef} from 'react';
import {AwayListener} from '../common/EscGlobalListener';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Drawer({open, onClose, children}: DrawerProps) {
  const drawerRef = useRef(null);

  return createPortal(
    <Transition
      in={open}
      timeout={0}
      unmountOnExit={true}
      mountOnEnter={true}
      drawerRef={drawerRef}
    >
      {(state) => (
        <AwayListener onClose={onClose}>
          <div
            className={cn(s.overlay, s[`overlay-${state}`])}
            onClick={onClose}
          />
          <div
            className={cn(s.drawer, s[`drawer-${state}`])}
            ref={drawerRef}
          >
            {children}
          </div>
        </AwayListener>
      )}
    </Transition>,
    document.body
  );
}
