import {createPortal} from 'react-dom';
import cn from 'classnames';
import {Transition} from 'react-transition-group';
import s from './Modal.module.css';
import {useRef} from 'react';
import {AwayListener} from '../common/EscGlobalListener';
import { Overlay } from '../common/Overlay';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({open, onClose, children}: ModalProps) {
  const modalRef = useRef(null);

  return createPortal(
    <Transition
      in={open}
      timeout={0}
      unmountOnExit={true}
      mountOnEnter={true}
      nodeRef={modalRef}
    >
      {(state) => (
        <AwayListener onClose={onClose}>
          <Overlay
            onClick={onClose}
            transitionState={state}
          />
          <div
            className={cn(s.modal, s[`modal-${state}`])}
            ref={modalRef}
          >
            {children}
          </div>
        </AwayListener>
      )}
    </Transition>,
    document.body
  );
}
