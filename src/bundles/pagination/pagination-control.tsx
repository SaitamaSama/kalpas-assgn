import styled from "@emotion/styled";
import * as React from "react";
import {
  VscArrowLeft as LeftArrow,
  VscArrowRight as RightArrow,
} from "react-icons/vsc";

const Container = styled.section({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 80,
});
const ControlContainer = styled.section({
  display: "flex",
});
export interface ControlProps {
  active?: boolean;
}
const Control = styled.button<ControlProps>((props) => ({
  border: "none",
  background: props.active ? "#ffffff" : "#bcbcbc",
  boxShadow: props.active ? "0 0.25rem 0.5rem rgba(0, 0, 0, 0.3)" : "none",
  outline: "none",
  cursor: "pointer",
  padding: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: "50%",
  margin: "0 .6rem",
  fontSize: "1rem",
  color: props.active ? "#000000" : "#ffffff",
  "&:hover": {
    background: "#fff",
    boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.3)",
    color: "#000",
  },
  fontFamily: "inherit",
  lineHeight: 1,
  fontWeight: 800,
}));
const LabelButton = styled.button({
  border: "none",
  background: "none",
  outline: "none",
  cursor: "pointer",
  padding: 0,
  margin: 0,
  fontSize: "1rem",
  color: "#666",
  "&:hover": {
    color: "#000",
  },
  fontFamily: "inherit",
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  fontWeight: "inherit",
});

export interface PaginationControlProps {
  page: number;
  pages: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
}

export const PaginationControl = (props: PaginationControlProps) => {
  const extras = 2;

  // This could be improved later, maybe with a better algorithm
  return (
    <Container>
      <ControlContainer>
        <LabelButton
          onClick={() => props.page !== 1 && props.onPageChange(props.page - 1)}
        >
          <LeftArrow style={{ marginRight: "0.5rem" }} /> Previous
        </LabelButton>
        {[...Array(props.pages).keys()].map((page) => {
          const pageNumber = page + 1;
          if (props.page === pageNumber) {
            let prefixCount = extras / 2;
            // If the page is the first page, we need not display anything as a prefix
            if (props.page === 1) {
              prefixCount = 0;
            }
            // If the page is the last page we need to display all the extras here
            if (props.page === props.pages) {
              prefixCount = extras;
            }
            const prefix = [...Array(prefixCount).keys()].map((index) => (
              <Control
                key={pageNumber + index}
                onClick={() => props.onPageChange(pageNumber - (index + 1))}
              >
                {pageNumber - (index + 1)}
              </Control>
            ));
            // Same deal as above but keeping for prosperity
            let suffixCount = extras / 2;
            // If the page is the last page, we need not display anything as a suffix
            if (props.page === props.pages) {
              suffixCount = 0;
            }
            // If the page is the first page we need to display all the extras here
            if (props.page === 1) {
              suffixCount = extras;
            }
            const suffix = [...Array(suffixCount).keys()].map((index) => (
              <Control
                key={pageNumber + index}
                onClick={() => props.onPageChange(pageNumber + (index + 1))}
              >
                {pageNumber + (index + 1)}
              </Control>
            ));
            return [
              ...prefix,
              <Control
                key={pageNumber}
                active
                onClick={() => props.onPageChange(pageNumber)}
              >
                {pageNumber}
              </Control>,
              ...suffix,
            ];
          }
          return null;
        })}

        <LabelButton
          onClick={() =>
            props.page !== props.pages && props.onPageChange(props.page + 1)
          }
        >
          Next <RightArrow style={{ marginLeft: "0.5rem" }} />
        </LabelButton>
      </ControlContainer>
    </Container>
  );
};
