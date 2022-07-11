import React, { useState } from "react";
import styled from "styled-components";
import FirstMessage from "../../components/FirstMessage";
import OpenView from "../../components/OpenView";
import { verifyToken } from "../../utils";
import axios from "axios";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 20px;
  margin-right: 20px;
`;

const Button = styled.div`
  display: flex;
  background-color: #a3acfa;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 10px 15px 5px rgba(0, 0, 0, 0.1);
`;

const OpenSvg = () => (
  <div>
    <svg focusable="false" viewBox="0 0 16 14" width="28" height="25" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#fff"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.116 4.884l1.768-1.768L8 9.232l6.116-6.116 1.768 1.768L8 12.768.116 4.884z"
      ></path>
    </svg>
  </div>
);

const ClosedSvg = () => (
  <div style={{ marginTop: 2 }}>
    <svg focusable="false" viewBox="0 0 28 32" height="30" width="33" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#fff"
        d="M28 32s-4.714-1.855-8.527-3.34H3.437C1.54 28.66 0 27.026 0 25.013V3.644C0 1.633 1.54 0 3.437 0h21.125c1.898 0 3.437 1.632 3.437 3.645v18.404H28V32zm-4.139-11.982a.88.88 0 00-1.292-.105c-.03.026-3.015 2.681-8.57 2.681-5.486 0-8.517-2.636-8.571-2.684a.88.88 0 00-1.29.107 1.01 1.01 0 00-.219.708.992.992 0 00.318.664c.142.128 3.537 3.15 9.762 3.15 6.226 0 9.621-3.022 9.763-3.15a.992.992 0 00.317-.664 1.01 1.01 0 00-.218-.707z"
      ></path>
    </svg>
  </div>
);

const ChatBox = (props) => {
  const authed = verifyToken(props.token);
  const [open, setOpen] = useState(false);
  const [showFirst, setShowFirst] = useState(false);

  const [messages, setMessages] = useState([
    {
      text: "Hey there 👋 \n \n Take a look around! If you have any questions, you can ask me anything.",
      isBot: true,
    },
  ]);

  const handleAddMessage = async (text) => {
    setMessages([...messages, { text, isBot: false }]);
    const resp = await axios.post("http://localhost:8000", { question: text, organisation: "rutter" });
    setMessages([...messages, { isBot: true, text: resp }]);
    // send message to api, get response then add to message array
  };

  setTimeout(() => {
    setShowFirst(true);
  }, 1500);

  const handleButtonClick = () => {
    setOpen(!open);
  };

  if (authed) {
    return (
      <Container>
        {showFirst && <FirstMessage chatOpen={open} />}
        {open && <OpenView handleAdd={handleAddMessage} messages={messages} />}
        <Button onClick={handleButtonClick}>{open ? <OpenSvg /> : <ClosedSvg />}</Button>
      </Container>
    );
  }
};

export default ChatBox;

// Button on press opens chatbox

// first message = what can i help you with today
