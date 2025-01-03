import {
  LoadingIndicator,
  Chat,
  ChannelList,
  Channel,
  Window,
  MessageInput,
  MessageList,
  ChannelHeader,
  useChatContext,
} from "stream-chat-react";
import { Button } from "../components/Button";
import { useLoggedInAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { ButtonAppBar } from "../components/ButtonAppbar";

export function CurrentChats() {
  const { user, streamChat } = useLoggedInAuth();

  if (streamChat == null) return <LoadingIndicator />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <ButtonAppBar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        <Chat client={streamChat}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
              height: "100%",
            }}
          >
            <Box
              sx={{
                width: "300px",
                borderRight: "1px solid #ddd",
                height: "100%",
              }}
            >
              <ChannelList
                List={Channels}
                sendChannelsToList
                filters={{ members: { $in: [user.id] } }}
              />
            </Box>
            <Box sx={{ flexGrow: 1, height: "100%" }}>
              <Channel>
                <Window>
                  <ChannelHeader />
                  <MessageList />
                  <MessageInput />
                </Window>
              </Channel>
            </Box>
          </Box>
        </Chat>
      </Box>
    </Box>
  );
}

function Channels({ loadedChannels }) {
  const navigate = useNavigate();
  const { logout } = useLoggedInAuth();
  const { setActiveChannel, channel: activeChannel } = useChatContext();

  return (
    <div className="w-full flex flex-col  h-full">
      <Button onClick={() => navigate("/channel/new")}>New Conversation</Button>
      <hr className="border-gray-500" />
      {loadedChannels != null && loadedChannels.length > 0
        ? loadedChannels.map((channel) => {
            const isActive = channel === activeChannel;
            const extraClasses = isActive
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100 bg-gray-100";
            return (
              <button
                onClick={() => setActiveChannel(channel)}
                disabled={isActive}
                className={`p-4 rounded-lg flex gap-3 items-center ${extraClasses}`}
                key={channel.id}
              >
                {channel.data?.image && (
                  <img
                    src={channel.data.image}
                    className="w-10 h-10 rounded-full object-center object-cover"
                  />
                )}
                <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {channel.data?.name || channel.id}
                </div>
              </button>
            );
          })
        : "No Conversations"}
      <hr className="border-gray-500 mt-auto" />
      <Button onClick={() => logout.mutate()} disabled={logout.isLoading}>
        Logout
      </Button>
    </div>
  );
}
