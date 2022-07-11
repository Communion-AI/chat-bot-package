import React from "react";
import styled from "styled-components";
import Message from "./Message";

const Container = styled.div`
  position: absolute;
  bottom: 90px;
  right: 10px;
  width: 300px;
  height: 600px;
  box-shadow: 1px 6px 15px -1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Top = styled.div`
  background-color: #a3acfa;
  height: 100px;
  padding: 10px;
  padding-left: 20px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
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
  flex-grow: 1;
`;

const TextInput = styled.input``;

const Input = () => {
  return <TextInput />;
};

const OpenView = ({ messages }) => {
  return (
    <Container>
      <Top>
        <SmallText>Communion</SmallText>
        <LargeText>Hi there 👋</LargeText>
        <SubText>Ask us anything, or share your feedback</SubText>
      </Top>
      <Bottom>
        <MessagesContainer>
          {messages.map((message) => (
            <Message message={message} />
          ))}
        </MessagesContainer>
        <Input />
      </Bottom>
    </Container>
  );
};

export default OpenView;
