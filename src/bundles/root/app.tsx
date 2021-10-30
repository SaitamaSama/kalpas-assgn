import styled from "@emotion/styled";
import * as React from "react";
import { get } from "../api/api";
import { IPost } from "../api/types";
import { FeedbackCard } from "../card/feedback";
import { ReaderCard } from "../card/reader";
import { ToggleCard } from "../card/toggle";
import { FeedbackForm } from "../form/feedback";
import { Pagination } from "../pagination/pagination";
import { PostCard } from "../post/card";
import { PostList } from "../post/list";

export interface SidebarProps {
  expanded?: boolean;
}
const Sidebar = styled.aside<SidebarProps>((props) => ({
  backgroundColor: "#ebf2f7",
  borderRadius: "0 2rem 2rem 0",
  boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.3)",
  width: props.expanded ? "calc(75% - 3rem)" : "calc(25% - 3rem)",
  height: "calc(100% - 3rem)",
  position: "absolute",
  left: 0,
  top: 0,
  padding: "1.5rem",
  zIndex: 5,
  transition: "width 0.3s ease-in-out",
  display: "flex",
  flexDirection: "row",
}));

const Container = styled.div({
  position: "relative",
  width: "100vw",
  height: "100vh",
});

export interface ContentProps {
  mode: "list" | "card";
}

const Content = styled.main<ContentProps>(() => ({
  position: "absolute",
  top: 0,
  left: "25%",
  width: "calc(75% - 14rem)",
  height: "calc(100% - 3rem)",
  overflow: "auto",
  backgroundColor: "#ebf2f7",
  zIndex: 2,
  padding: "1.5rem 7rem",
}));

export interface BackdropProps {
  visible: boolean;
  modal?: boolean;
}
const Backdrop = styled.div<BackdropProps>((props) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  zIndex: props.visible ? (props.modal ? 6 : 4) : 1,
  transition: "opacity 0.3s",
  opacity: props.visible ? 1 : 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const Modal = styled.div({
  width: "60vw",
  height: "60vh",
  borderRadius: "1rem",
});
const IFrame = styled.iframe({
  width: "100%",
  height: "100%",
  border: "none",
  borderRadius: "1rem",
});

export const App = () => {
  const [mode, setMode] = React.useState<"list" | "card">("card");
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [selectedPost, setSelectedPost] = React.useState<IPost | null>(null);
  const [removedPosts, setRemovedPosts] = React.useState<IPost[]>([]);
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);

  const addRemovalPost = (post: IPost) =>
    setRemovedPosts([...removedPosts, post]);

  React.useEffect(() => {
    get<IPost[]>("/posts").then((posts) => {
      setPosts(posts);
    });
  }, []);

  const renderContent = () => {
    if (mode === "card") {
      return (
        <Pagination
          posts={posts.filter(
            (post) => !removedPosts.find((removed) => removed.id === post.id),
          )}
          render={(post) => (
            <PostCard
              post={post}
              onClick={(post) => setSelectedPost(post)}
              onRemove={(post) => addRemovalPost(post)}
              key={post.id}
            />
          )}
          mode={mode}
        />
      );
    }
    if (mode === "list") {
      return (
        <Pagination
          posts={posts.filter(
            (post) => !removedPosts.find((removed) => removed.id === post.id),
          )}
          render={(post) => (
            <PostList
              post={post}
              onClick={(post) => setSelectedPost(post)}
              onRemove={(post) => addRemovalPost(post)}
              key={post.id}
            />
          )}
          mode={mode}
          limit={4}
        />
      );
    }
  };

  return (
    <Container>
      <Backdrop
        visible={Boolean(selectedPost)}
        onClick={() => setSelectedPost(null)}
        modal
      >
        <Modal>
          <IFrame src="https://example.com" />
        </Modal>
      </Backdrop>
      <Backdrop visible={feedbackOpen} onClick={() => setFeedbackOpen(false)} />
      <Sidebar expanded={feedbackOpen}>
        <section style={{ width: "calc(25vw - 3rem)" }}>
          <ReaderCard />
          {!feedbackOpen && (
            <>
              <br />
              <ToggleCard mode={mode} onToggle={setMode} />
            </>
          )}
          <br />
          <FeedbackCard
            toggleFeedback={() => setFeedbackOpen(!feedbackOpen)}
            feedbackOpen={feedbackOpen}
          />
        </section>
        {feedbackOpen && <FeedbackForm />}
      </Sidebar>
      <Content mode={mode}>{renderContent()}</Content>
    </Container>
  );
};
