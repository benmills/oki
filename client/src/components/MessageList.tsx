import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ServerMessageTypeUnion } from "../App";
import Username from "./Username";
import { MESSAGE_INPUT_HEIGHT } from "./MessageInput";

export type MessageListProps = {
  messages: {
    content: string,
    isServerMessage: boolean,
    type: ServerMessageTypeUnion,
    username?: string,
    hexcode?: string,
  }[];
  className?: string;
};

const MessageList = ({ messages, className }: MessageListProps) => {
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [userScrolled, setUserScrolled] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!wrapperRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = wrapperRef.current;
    const atBottom = scrollHeight - scrollTop === clientHeight;

    setShowScrollToBottom(!atBottom);
    setUserScrolled(true);
  };

  const scrollToBottom = () => {
    setUserScrolled(false);
    setTimeout(() => {
      if (wrapperRef.current) {
        wrapperRef.current.scrollTo(0, wrapperRef.current.scrollHeight);
      }
    }, 50);
  };

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    setUserScrolled(false);
    scrollToBottom();
  }, [messages]);

  return (
    <Wrapper ref={wrapperRef} className={className}>
      <List>
        {messages.map((message, index) => {
          return message.isServerMessage ? (
            <ServerEventMessage type={message.type} key={index}>
              <Username hexcode={message.hexcode}>{message.username}</Username> {message.content}
            </ServerEventMessage>
          ) : (
            <Message key={index}>
              <Username hexcode={message.hexcode}>{message.username}:</Username>
              {message.content}
            </Message>
          );
        })}
      </List>
      {showScrollToBottom && userScrolled && (
        <ScrollToBottomButton onClick={scrollToBottom}>Newer messages</ScrollToBottomButton>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  margin-bottom: ${MESSAGE_INPUT_HEIGHT};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

const Message = styled.li`
  padding: 0 12px;
  max-width: 100vw;
`;

const ServerEventMessage = styled(Message) <{ type: "connected" | "disconnected", }>`
  --border-color: ${props => props.type === "connected" ? "green" : "red"};
  padding: 12px;
  background: #333;
  border: 1px solid var(--border-color);
  border-radius: .25rem;
  margin: 6px 12px;
`;

const ScrollToBottomButton = styled.button`
  position: absolute;
  top: 82px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px 6px;
`;


export default MessageList;
