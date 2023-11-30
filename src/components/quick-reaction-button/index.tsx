import { Avatar, IconButton } from "@mui/material";
import heart from "../../assets/react.png";

type Props = {
  onQuickReactionClick: () => void;
};

export const QuickReaction = ({ onQuickReactionClick }: Props) => {
  return (
    <IconButton onClick={onQuickReactionClick}>
      <Avatar sx={{ width: 30, height: 30 }} src={heart} alt="quickReaction" />
    </IconButton>
  );
};
