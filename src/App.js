import React, { useState} from 'react';
import Modal from './Modal'
import QrGenerator from './QrGenerator';
import axios from 'axios';

function App() {
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);
  const [text,setText] = useState("테스트");
  const [time,setTime] = useState("05:00");

  const openModal = () => {
    setModalOpen(true);
    timer();
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const timer = async () => {
    const countDownSeconds = 10;
    let startTime = new Date().getTime()+countDownSeconds*1000;
    function updateTimer(){
      let currentTime = new Date().getTime();
      let difference = startTime - currentTime;

      // 차이가 양수인 경우, 남은 시간을 계산하고 출력합니다.
      if (difference >= 0) {
        let minutes = Math.floor(difference / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // 남은 시간을 00:00 형태로 포맷합니다.
        let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // 남은 시간을 출력합니다.
        setTime(formattedTime);
      }else {
        clearInterval(timerInterval);
        closeModal();
        alert("시간이 만료되었습니다.");
        console.log("타이머 종료");
      }
    }  
    let timerInterval = setInterval(updateTimer, 1000);  
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
        <div>{time}</div>
        <button onClick={handleButtonClick}> 가져오기</button>
      </Modal>
    </React.Fragment>
  );
  
}

export default App;