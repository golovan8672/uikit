import {useState} from 'react';
import {Modal} from './components//Modal';
import {Drawer} from './components/Drawer';
import {EscGlobalListener} from './components/common/EscGlobalListener';

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <EscGlobalListener>
        <button
          onClick={() => setOpenModal(true)}
        >
          {'Open modal'}
        </button>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <button
            onClick={() => setOpenDrawer(true)}
          >
            {'Open drawer'}
          </button>
          <Drawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >
            <div style={{color: 'red'}}>{123}</div>
          </Drawer>
        </Modal>
      </EscGlobalListener>
    </>
  );
}

export default App;
