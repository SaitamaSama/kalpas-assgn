import styled from "@emotion/styled";
import * as React from "react";
import { ToggleButtonContainer } from "./toggle";

const Card = styled.section({
  backgroundColor: "#fff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  borderRadius: "4px",
  padding: "18px",
});

const Title = styled.div({
  fontSize: 18,
  fontWeight: 800,
});

const Button = styled.button<{ open: boolean }>((props) => ({
  backgroundColor: props.open ? "#eca4a7" : "#98eec8",
  border: "none",
  cursor: "pointer",
  fontSize: 18,
  fontWeight: 400,
  marginLeft: "auto",
  outline: "none",
  padding: 18,
  fontFamily: "inherit",
  flexGrow: 1,
  borderRadius: "4px",
  ":hover": {
    backgroundColor: props.open ? "#eca4a7" : "#3ef1a1",
  },
  transition: "background-color 0.2s ease-in-out",
  lineHeight: 1,
}));

export interface FeedbackCardProps {
  feedbackOpen: boolean;
  toggleFeedback: () => void;
}

export const FeedbackCard = (props: FeedbackCardProps) => {
  return (
    <Card>
      <Title>Have a Feedback?</Title>
      <ToggleButtonContainer>
        <Button
          onClick={() => props.toggleFeedback()}
          open={props.feedbackOpen}
        >
          We&lsquo;re listening!
        </Button>
      </ToggleButtonContainer>
    </Card>
  );
};
