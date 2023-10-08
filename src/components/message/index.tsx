import { auth } from "../../firebase";
import { SentMessage } from "./sent";
import { ReceivedMessage } from "./received/index.";
export type MessageProps = {
  reaction: boolean;
  email: string;
  message: string;
  displayName: string;
  createdAt: number;
  avatar?: string | null;
};

export const Message = ({
  message,
  displayName,
  createdAt,
  email,
  avatar,
  reaction,
}: MessageProps) => {
  return email === auth.currentUser?.email ? (
    <SentMessage
      reaction={reaction}
      avatar={avatar}
      email={email}
      message={message}
      displayName={displayName}
      createdAt={createdAt}
    />
  ) : (
    <ReceivedMessage
      reaction={reaction}
      email={email}
      message={message}
      displayName={displayName}
      createdAt={createdAt}
    />
  );
};
