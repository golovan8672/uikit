import {createPortal} from 'react-dom';
import cn from 'classnames';
import {Transition, type TransitionStatus} from 'react-transition-group';
import s from './Drawer.module.css';
import {useRef} from 'react';
import {AwayListener} from '../common/EscGlobalListener';
import { Overlay } from '../common/Overlay';

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
          <Overlay
            transitionState={state}
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
