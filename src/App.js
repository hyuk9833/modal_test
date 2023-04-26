import React, { useState} from 'react';
import Modal from './Modal'
import QrGenerator from './QrGenerator';
import axios from 'axios';

function App() {
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);
  const [text,setText] = useState("테스트");
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  
  const handleButtonClick = async () => {
    const walletAddress = "0x437782D686Bcf5e1D4bF1640E4c363Ab70024FBC"; // replace with your wallet address
    const apiKey = "replace with your EtherScan API Key"; // replace with your Etherscan API key
    const data = await getWalletTransaction(walletAddress, apiKey);
    setText(`Your last Transaction is ${data}`);
  }
  const getWalletTransaction = async (walletAddress, apiKey) => {
      const response = await axios.get(`https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`).catch(error => {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request)
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log('Error', error.message)
        }
        console.log(error.config)
      });
      const gasprice = response.data.result;
      console.log(gasprice[0].hash);
      return gasprice;
  }
  return (
    <React.Fragment>
      <button onClick={openModal}>모달팝업</button>
      {/* Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
      <Modal open={modalOpen} close={closeModal} header="Modal heading">
        <QrGenerator number="0001" name="abc" price="30000" platformname="nangnang"/>
        <div>{text}</div>
        <button onClick={handleButtonClick}> 가져오기</button>
      </Modal>
    </React.Fragment>
  );
  
}

export default App;