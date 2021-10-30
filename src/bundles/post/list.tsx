import styled from "@emotion/styled";
import * as React from "react";
import { VscClose as CloseIcon } from "react-icons/vsc";
import { IPost } from "../api/types";

const ListItemContainer = styled.section({
  display: "flex",
  alignItems: "center",
});
const ListItem = styled.article({
  backgroundColor: "#fff",
  padding: "1rem",
  borderRadius: "1rem",
  margin: "1rem",
  boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.1)",
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexGrow: 1,
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
  width: 64,
  height: 64,
  borderRadius: "50%",
});
const CloseIconButton = styled.button({
  border: "none",
  outline: "none",
  width: 48,
  height: 48,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  color: "#e04444",
  cursor: "pointer",
  background: "#ffffff",
});

export interface PostListProps {
  post: IPost;
  onClick: (post: IPost) => void;
  onRemove: (post: IPost) => void;
}

export const PostList = (props: PostListProps) => {
  return (
    <ListItemContainer>
      <ListItem onClick={() => props.onClick(props.post)}>
        <Image
          src={`https://via.placeholder.com/64/${Math.floor(
            Math.random() * 16777215,
          ).toString(16)}`}
        />
        <section style={{ marginLeft: "1.5rem" }}>
          <Title>
            {props.post.title.length > 120
              ? props.post.title.substr(0, 117) + "..."
              : props.post.title}
          </Title>
          <Description>
            {props.post.body.length > 90
              ? props.post.body.substr(0, 87) + "..."
              : props.post.body}
          </Description>
          <Time>{new Date().toLocaleString()}</Time>
        </section>
      </ListItem>
      <CloseIconButton onClick={() => props.onRemove(props.post)}>
        <CloseIcon style={{ fontSize: "inherit" }} />
      </CloseIconButton>
    </ListItemContainer>
  );
};
