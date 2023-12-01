import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { db, auth } from "../../firebase";
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
  const handleSelect = async () => {
    console.log("current:", auth.currentUser);
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
              // avatar: auth.currentUser.,
            },
            [combinedId + ".lastMessage"]: {
              message: "",
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
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
      padding={1.5}
      onClick={handleSelect}
      gap={2}
      display={"flex"}
      width={"80%"}
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
