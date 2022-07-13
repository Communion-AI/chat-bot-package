import React, { useState } from "react";
import styled from "styled-components";
import Message from "./Message";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 90px;
  right: 10px;
  width: 300px;
  height: 600px;
  box-shadow: 1px 6px 15px -1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding-bottom: 10px;
`;

const Top = styled.div`
  background-color: #a3acfa;
  height: 100px;
  padding: 10px;
  padding-left: 20px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
`;

const SmallText = styled.p`
  font-size: 8px;
  font-weight: 500;
  color: #fff;
`;

const LargeText = styled.p`
  font-size: 30px;
  margin: 0;
  color: #fff;
  margin-bottom: 5px;
`;

const SubText = styled.p`
  margin: 0;
  color: #fff;
  font-size: 12px;
`;

const MessagesContainer = styled.div`
  height: 420px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 50px;
  align-items: center;
`;

const TextInput = styled.textarea`
  display: flex;
  resize: none;
  flex-grow: 1;
  border: none;
  overflow: auto;
  outline: none;
  height: 50px;
  border-top: 1px solid grey;
  margin: 0;
  padding: 0;
  padding-top: 10px;
  padding-left: 10px;
`;

const SubmitButton = styled.div`
  display: flex;
  width: 20px;
  height: 50px;
  border-top: 1px solid grey;
  margin: 0;
  padding: 0;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 10px;
`;

const RespondingContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isBot ? "flex-start" : "flex-end")};
  padding: 15px;
`;

const RespondingInner = styled.div`
  background-color: ${(props) => props.background};
  padding: 8px;
  border-radius: 8px;
  max-width: 80%;
`;

const Input = ({ onClick }) => {
  const [text, setText] = useState("");

  const handleClick = () => {
    onClick(text);
    setText("");
    document.getElementById("textarea").value = "";
  };

  return (
    <InputContainer>
      <TextInput id="textarea" contentEditable={true} onChange={(event) => setText(event.target.value)} />
      <SubmitButton onClick={handleClick}>
        <svg style={{ marginBottom: 10 }} focusable="false" aria-hidden="true" viewBox="0 0 16 16">
          <path
            d="M1.388 15.77c-.977.518-1.572.061-1.329-1.019l1.033-4.585c.123-.543.659-1.034 1.216-1.1l6.195-.72c1.648-.19 1.654-.498 0-.687l-6.195-.708c-.55-.063-1.09-.54-1.212-1.085L.056 1.234C-.187.161.408-.289 1.387.231l12.85 6.829c.978.519.98 1.36 0 1.88l-12.85 6.83z"
            fillRule="evenodd"
          ></path>
        </svg>
      </SubmitButton>
    </InputContainer>
  );
};

const RespondingMessage = () => {
  return (
    <RespondingContainer isBot={true}>
      <RespondingInner background={"#e8e8e8"}>
        <Dots size={10} speed={0.7} />
      </RespondingInner>
    </RespondingContainer>
  );
};

const OpenView = ({ messages, handleAdd, responding }) => {
  const onInputSubmit = async (text) => {
    await handleAdd(text);
  };

  return (
    <Container>
      <Top>
        <SmallText>Communion</SmallText>
        <LargeText>Hi there 👋</LargeText>
        <SubText>Ask me anything</SubText>
      </Top>
      <Body>
        <MessagesContainer style={{ overflowY: "scroll" }}>
          {messages.map((message) => (
            <Message message={message} />
          ))}
          {responding && <RespondingMessage />}
        </MessagesContainer>
      </Body>
      <Input onClick={onInputSubmit} />
    </Container>
  );
};

export default OpenView;
