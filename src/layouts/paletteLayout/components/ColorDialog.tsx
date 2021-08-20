import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import { str2color } from "../../usePalette";

function ColorDialog({ onPick, type, ...rest }) {
  const theme = useTheme();

  return (
    <Dialog {...rest}>
      <DialogTitle>
        Pick a {type === "primary" ? "primary" : "secondary"} color
      </DialogTitle>
      <DialogContent>
        <Grid container justify="space-between">
          {[
            "amber",
            "blue",
            "cyan",
            "deepOrange",
            "deepPurple",
            "green",
            "indigo",
            "lightBlue",
            "lightGreen",
            "lime",
            "orange",
            "pink",
            "purple",
            "red",
            "teal",
            "yellow"
          ].map((color, i) => (
            <Grid key={i} item xs={3}>
              <Box
                p={2}
                bgcolor={str2color(color)[type === "primary" ? 500 : "A400"]}
                color={theme.palette.getContrastText(
                  str2color(color)[type === "primary" ? 500 : "A400"]
                )}
                onClick={() => onPick(color)}
                style={{ cursor: "pointer" }}
              >
                {color}
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default ColorDialog;