import { Card, CardContent, Typography } from "@mui/material";

const NoteDisplay = ({ title, body }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default NoteDisplay;
