import * as React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

function NoteCard({ id, title, body }) {
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Link to={`/notes/detail/${id}`} className="noHoverEffect">
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {body}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
}

export default NoteCard;
