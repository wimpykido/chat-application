import { Button, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type SendProps = {
  handleSubmit: (data: any) => Promise<void>;
};

export const Send = ({ handleSubmit }: SendProps) => {
  return (
    <Button
      sx={{
        backgroundColor: "#00A3FF",
        color: "white",
        borderRadius: "5px",
      }}
      onClick={handleSubmit}
    >
      <Typography textTransform={"none"} marginRight={0.5}>
        send
      </Typography>
      <SendIcon fontSize="small" />
    </Button>
  );
};
