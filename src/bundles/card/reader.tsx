import styled from "@emotion/styled";
import * as React from "react";
import avatar from "../assets/person.jpg";

const Card = styled.section({
  backgroundColor: "#fff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  borderRadius: "4px",
  padding: "18px",
  display: "flex",
});

const Avatar = styled.img({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  marginRight: "10px",
});

const Title = styled.div({
  fontSize: 18,
  fontWeight: 800,
});

const Description = styled.span({
  fontSize: 14,
  color: "#666",
});

export const ReaderCard = () => {
  return (
    <Card>
      <Avatar src={avatar} />
      <section>
        <Title>Hi Reader,</Title>
        <Description>Here's your news!</Description>
      </section>
    </Card>
  );
};
