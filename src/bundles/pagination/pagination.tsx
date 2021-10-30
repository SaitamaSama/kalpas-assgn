import styled from "@emotion/styled";
import * as React from "react";
import { IPost } from "../api/types";
import { ContentProps } from "../root/app";
import { PaginationControl } from "./pagination-control";

export interface PaginationProps {
  posts: IPost[];
  render: (posts: IPost) => React.ReactNode;
  mode: "card" | "list";
  limit?: number;
}

const Container = styled.section({
  display: "flex",
  flexDirection: "column",
});

const ContentContainer = styled.section<ContentProps>((props) => ({
  display: "grid",
  gridTemplateColumns: props.mode === "card" ? "1fr 1fr 1fr" : "1fr",
  gap: "2rem",
}));

export const Pagination = (props: PaginationProps) => {
  const [offset, setOffset] = React.useState(0);
  const [limit, setLimit] = React.useState(6);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(0);

  const handlePageChange = (page: number) => {
    setPage(page);
    setOffset((page - 1) * limit);
  };

  React.useEffect(() => {
    setTotal(props.posts.length);
    setPages(Math.ceil(props.posts.length / limit));
  }, [props.posts.length]);

  React.useEffect(() => {
    setLimit(props.limit || 6);
  }, [props.limit]);

  return (
    <Container>
      <ContentContainer mode={props.mode}>
        {props.posts
          .slice(offset, offset + limit)
          .map((post) => props.render(post))}
      </ContentContainer>
      <PaginationControl
        page={page}
        pages={pages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};
