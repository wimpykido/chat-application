import { Button, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type SendProps = {
  handleSubmit: (data: any) => Promise<void>;
};

export const Send = ({ handleSubmit }: SendProps) => {
  return (
    <Button
      sx={{
        backgroundColor: { xs: "none", md: "#00A3FF" },
        color: "white",
        borderRadius: "5px",
      }}
      onClick={handleSubmit}
    >
      <Typography
        display={{ xs: "none", md: "flex" }}
        textTransform={"none"}
        marginRight={0.5}
      >
        send
      </Typography>
      <SendIcon
        sx={{
          fontSize: {
            xs: "large", 
            md: "small",
          },
        }}
      />
    </Button>
  );
};
