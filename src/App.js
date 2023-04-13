import React, { useState } from 'react';
import Modal from './Modal';
import QrGenerator from './QrGenerator';

function App() {
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={openModal}>모달팝업</button>
      {/* Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
      <Modal open={modalOpen} close={closeModal} header="Modal heading">
        <QrGenerator number="0001" name="abc" price="30000" platformname="nangnang"/>
      </Modal>
    </React.Fragment>
  );
  
}

export default App;