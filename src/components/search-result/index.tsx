import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
type SearchResultProps = {
  displayName?: string;
  avatar?: string | null;
  id: string;
};

export const SearchResult = ({
  displayName,
  avatar,
  id,
}: SearchResultProps) => {
  const navigate = useNavigate();
  const handleSelect = async () => {
    if (auth.currentUser) {
      const combinedId =
        auth.currentUser.uid > id
          ? `${auth.currentUser.uid}_${id}`
          : `${id}_${auth.currentUser.uid}`;

      try {
        const chatRef = doc(db, "chats", combinedId);
        const chatSnap = await getDoc(chatRef);
        if (!chatSnap.exists()) {
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
          await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: id,
              displayName: displayName,
              // avatar: avatar,
            },
            [combinedId + ".lastMessage"]: {
              message: "",
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
          await updateDoc(doc(db, "userChats", id), {
            [combinedId + ".userInfo"]: {
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
              // avatar: auth.currentUser.photoURL,
            },
            [combinedId + ".lastMessage"]: {
              message: "",
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
          navigate(`/chat/${combinedId}`);
        } else {
          console.log("arsebobs");
        }
      } catch (err) {
        console.log({ "errori gakvs": err });
      }
    }
  };

  const theme = useTheme();

  return (
    <Box
      onClick={handleSelect}
      gap={1}
      display={"flex"}
      width={"90%"}
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      {avatar ? (
        <Avatar
          src={`data:image/svg+xml;utf8,${encodeURIComponent(avatar)}`}
          alt={displayName}
        />
      ) : (
        <Avatar />
      )}
      <Typography color={theme.palette.primary.contrastText}>
        {displayName}
      </Typography>
    </Box>
  );
};
