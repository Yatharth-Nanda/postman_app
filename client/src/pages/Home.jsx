import {
  Chat,
  Channel,
  LoadingIndicator,
  Window,
  MessageInput,
  MessageList,
  ChannelList,
  ChannelHeader,
} from "stream-chat-react";
import { useLoggedInAuth } from "../context/AuthContext";
import { useChatContext } from "stream-chat-react";

export function Home() {
  const { user, streamChat } = useLoggedInAuth();

  if (streamChat == null) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={streamChat}>
      <ChannelList />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
}
