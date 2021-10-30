import styled from "@emotion/styled";
import * as React from "react";
import {
  VscCreditCard as CardIcon,
  VscListFlat as ListIcon,
} from "react-icons/vsc";

export interface ToggleCardProps {
  onToggle: (mode: "card" | "list") => void;
  mode: "card" | "list";
}

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

export interface ToggleCardButtonProps {
  active: boolean;
}

export const ToggleCardButton = styled.button<ToggleCardButtonProps>(
  (props) => ({
    backgroundColor: props.active ? "#98eec8" : "#d9e2ea",
    border: "none",
    cursor: "pointer",
    fontSize: 18,
    fontWeight: 400,
    marginLeft: "auto",
    outline: "none",
    padding: 18,
    fontFamily: "inherit",
    flexGrow: 1,
    ":first-child": {
      borderRadius: "4px 0 0 4px",
    },
    ":last-child": {
      borderRadius: "0 4px 4px 0",
    },
    ":hover": {
      backgroundColor: props.active ? "#98eec8" : "#b7e7d2",
    },
    transition: "background-color 0.2s ease-in-out",
    lineHeight: 1,
  }),
);

export const ToggleButtonContainer = styled.section({
  display: "flex",
  marginTop: "18px",
});

export const ToggleCard: React.FunctionComponent<ToggleCardProps> = (props) => {
  return (
    <Card>
      <Title>Card / List</Title>
      <ToggleButtonContainer>
        <ToggleCardButton
          active={props.mode === "card"}
          onClick={() => props.onToggle("card")}
        >
          <CardIcon style={{ fontSize: 24 }} />
        </ToggleCardButton>
        <ToggleCardButton
          active={props.mode === "list"}
          onClick={() => props.onToggle("list")}
        >
          <ListIcon style={{ fontSize: 24 }} />
        </ToggleCardButton>
      </ToggleButtonContainer>
    </Card>
  );
};
