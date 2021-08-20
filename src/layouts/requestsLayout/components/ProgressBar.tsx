import React from "react";

import { Box, Collapse, LinearProgress } from "@material-ui/core";

export default function ProgressBar({ showProgressBar = false, items = [] }) {
  // List of !deleted items
  const activeItems = items.filter(({ deleted }) => !deleted);
  // Filter completed items
  const completedItems = activeItems.filter(({ completed }) => completed);
  // Complete percentage
  const completed = activeItems.length > 0 ? (completedItems.length / activeItems.length) * 100 : 0;
  
  return (
    <Collapse in={showProgressBar}>
      <Box py={1}>
        <LinearProgress
          variant="determinate"
          color={
            completedItems.length === activeItems.length
              ? "secondary"
              : "primary"
          }
          value={completed}
        />
      </Box>
    </Collapse>
  );
}
