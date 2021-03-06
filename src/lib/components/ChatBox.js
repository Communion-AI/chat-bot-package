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
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 10px 15px 5px rgba(0, 0, 0, 0.1);
`;

const OpenSvg = ({ onClick, primaryColor }) => (
  <Button onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
      <path
        d="M60 30C60 37.8763 60 60 60 60C60 60 38.6922 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30Z"
        fill={primaryColor}
      />
      <path d="M13 29L31.5 40L48 29" stroke="white" stroke-width="1.5" />
    </svg>
  </Button>
);

const ClosedSvg = ({ onClick, primaryColor }) => (
  <Button onClick={onClick} style={{ marginTop: 2 }}>
    <svg width="60" height="60" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 15C30 18.9382 30 30 30 30C30 30 19.3461 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15Z"
        fill={primaryColor}
      />
      <path d="M5 18C14.0047 28.8666 23.4186 22.5277 27 18" stroke="white" stroke-width="0.75" />
    </svg>
  </Button>
);

const ChatBox = (props) => {
  const authed = verifyToken(props.token);
  const [open, setOpen] = useState(false);
  const [showFirst, setShowFirst] = useState(false);
  const [responding, setResponding] = useState(false);

  const { firstMessage, primaryColor, secondaryColor, organisation, url } = props;

  const [messages, setMessages] = useState([
    {
      text: firstMessage,
      isBot: true,
    },
  ]);

  const handleAddMessage = async (text) => {
    setMessages([...messages, { text, isBot: false }]);
    setResponding(true);

    const _messages = messages.map((m) => {
      if (m.isBot) {
        return { AI: m.text };
      } else {
        return { Human: m.text };
      }
    });

    const resp = await axios.post(
      url,
      {
        question: text,
        messages: _messages,
        organisation: organisation,
      },
      { headers: { "Content-Type": "application/json" } },
    );
    setResponding(false);
    setMessages([...messages, { text, isBot: false }, { isBot: true, text: resp.data }]);
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
        {open && (
          <OpenView
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            handleAdd={handleAddMessage}
            messages={messages}
            responding={responding}
          />
        )}
        {open ? (
          <OpenSvg primaryColor={primaryColor} onClick={handleButtonClick} />
        ) : (
          <ClosedSvg primaryColor={primaryColor} onClick={handleButtonClick} />
        )}
      </Container>
    );
  }
};

export default ChatBox;
