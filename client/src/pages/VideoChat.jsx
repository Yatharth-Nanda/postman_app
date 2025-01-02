import React, { useEffect, useState } from "react";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  useCallStateHooks,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useAuth } from "../context/AuthContext";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "../styles.css";

const callId = "call4"; // link to appointment id

export function VideoChat() {
  const { user, token } = useAuth();
  const [videoClient, setVideoClient] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    if (!user || !token) return;

    const initializeClient = async () => {
      const client = StreamVideoClient.getOrCreateInstance({
        apiKey: import.meta.env.VITE_STREAM_API_KEY,
        user,
        token,
      });

      const callInstance = client.call("default", callId);
      await callInstance.getOrCreate();
      await callInstance.join({ create: true });
      setVideoClient(client);
      setCall(callInstance);
      console.log("call joined");
    };

    initializeClient();
  }, [user, token]);

  if (!videoClient || !call) {
    return <div>Loading...</div>;
  }

  return (
    <StreamVideo client={videoClient}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};
