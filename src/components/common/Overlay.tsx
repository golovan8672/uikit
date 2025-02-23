import type {TransitionStatus} from 'react-transition-group';

const transitionStyles = {
  entered: {
    transition: 'opacity 195ms',
    opacity: 1,
  },
  exiting: {
    transition: 'opacity 195ms',
    opacity: 0,
  },
} as const;

export function Overlay({
  onClick,
  transitionState,
}: {
  onClick: () => void;
  transitionState: TransitionStatus;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        ...transitionStyles[transitionState as 'entered' | 'exiting'],
      }}
      onClick={onClick}
    />
  );
}
