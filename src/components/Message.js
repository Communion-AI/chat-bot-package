import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isBot ? "flex-start" : "flex-end")};
  padding: 15px;
`;

const Inner = styled.div`
  background-color: ${(props) => props.background};
  padding: 8px;
  border-radius: 8px;
  width: 80%;
`;

const Text = styled.p`
  font-size: 11px;
  white-space: pre-line;
  color: ${(props) => props.color};
`;

const Message = ({ message }) => {
  return (
    <Container isBot={message.isBot}>
      <Inner background={message.isBot ? "#e8e8e8" : "#a3acfa"}>
        <Text color={message.isBot ? "#000" : "#fff"}>{message.text}</Text>
      </Inner>
    </Container>
  );
};

export default Message;
