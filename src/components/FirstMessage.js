import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 80px;
  right: 10px;
  padding: 10px;
  width: 300px;
  height: 120px;
  box-shadow: 1px 6px 15px -1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Bottom = styled.div`
  width: 100%;
`;

const Text = styled.p`
  color: rgb(104, 104, 104);
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-left: 6px;
`;

const Bold = styled.p`
  font-weight: 700;
  margin-right: 3px;
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
`;

const CloseContainer = styled.div`
  background-color: rgb(93, 108, 128);
  height: 20px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const CloseText = styled.p`
  font-size: 8px;
  color: #fff;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <Text style={{ fontSize: 30, padding: 0, margin: 0 }}>👋</Text>
      <Text>
        <Bold>Jeffery</Bold> from Moksha
      </Text>
    </ProfileContainer>
  );
};

const CloseButton = ({ onClick }) => {
  const handleClick = () => onClick();
  return (
    <CloseContainer style={{ cursor: "default" }} onClick={handleClick}>
      <CloseText>Clear</CloseText>
    </CloseContainer>
  );
};

const FirstMessage = ({ chatOpen }) => {
  const [open, setOpen] = useState(!chatOpen);
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    if (chatOpen) {
      setOpen(false);
    }
  }, [chatOpen]);

  const handleClear = () => {
    setOpen(false);
  };

  if (open) {
    return (
      <Container onMouseEnter={() => setShowClose(true)} onMouseLeave={() => setShowClose(false)}>
        <Top>
          <Profile />
          {showClose && <CloseButton onClick={handleClear} />}
        </Top>
        <Bottom>
          <Text>Hey there, take a deep breath and look around. Are you looking for anything specifically?</Text>
        </Bottom>
      </Container>
    );
  } else {
    return <></>;
  }
};

export default FirstMessage;
