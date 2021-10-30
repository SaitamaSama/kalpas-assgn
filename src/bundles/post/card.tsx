import styled from "@emotion/styled";
import * as React from "react";
import { VscClose as CloseIcon } from "react-icons/vsc";
import { IPost } from "../api/types";

const Card = styled.article({
  backgroundColor: "#fff",
  padding: "1rem",
  borderRadius: "1rem",
  margin: "1rem",
  boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.1)",
  position: "relative",
  cursor: "pointer",
});
const Title = styled.div({
  fontSize: "1.7rem",
  fontWeight: 800,
  marginBottom: "1rem",
});
const Description = styled.p({
  fontSize: "1.2rem",
  marginBottom: "1rem",
});
const Time = styled.time({
  fontSize: "1rem",
  color: "#999",
  fontWeight: 800,
});
const Image = styled.img({
  width: "100%",
  height: 175,
  borderRadius: "0.5rem",
  marginTop: "1rem",
});
const CloseIconContainer = styled.span({
  position: "absolute",
  top: 14,
  right: 14,
  cursor: "pointer",
  fontSize: "1.5rem",
  color: "#e04444",
});

export interface PostCardProps {
  post: IPost;
  onClick: (post: IPost) => void;
  onRemove: (post: IPost) => void;
}

export const PostCard = (props: PostCardProps) => {
  return (
    <Card onClick={() => props.onClick(props.post)}>
      <CloseIconContainer>
        <CloseIcon
          style={{ fontSize: "inherit" }}
          onClick={(ev) => {
            ev.stopPropagation();
            props.onRemove(props.post);
          }}
        />
      </CloseIconContainer>
      <Title>
        {props.post.title.length > 30
          ? props.post.title.substr(0, 27) + "..."
          : props.post.title}
      </Title>
      <Description>
        {props.post.body.length > 90
          ? props.post.body.substr(0, 87) + "..."
          : props.post.body}
      </Description>
      <Time>{new Date().toLocaleString()}</Time>
      <Image
        src={`https://via.placeholder.com/350x175/${Math.floor(
          Math.random() * 16777215,
        ).toString(16)}`}
      />
    </Card>
  );
};
