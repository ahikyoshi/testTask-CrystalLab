import { Box, Typography, Paper } from "@mui/material";

type HistoryItemProps = {
  originalCommand: string;
  optimizedCommand: string;
  diamond_pos: {
    before: { x: number; y: number };
    after: { x: number; y: number };
  };
  date: string;
};

export const HistoryItem = ({ note }: { note: HistoryItemProps }) => {
  const date = new Date(note.date);

  return (
    <Paper
      elevation={3}
      sx={{
        width: 350,
        p: 2,
      }}
    >
      <Typography variant="body2" fontWeight="bold">
        Изначальная команда:
      </Typography>
      <Typography variant="body2" sx={{ wordBreak: "break-word", mb: 1 }}>
        {note.originalCommand}
      </Typography>

      <Typography variant="body2" fontWeight="bold">
        Оптимизированная команда: {note.optimizedCommand}
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        Образец, до: x: {note.diamond_pos.before.x}, y:{" "}
        {note.diamond_pos.before.y}, после: x: {note.diamond_pos.after.x}, y:{" "}
        {note.diamond_pos.after.y}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          fontFamily: "monospace",
        }}
      >
        <Typography variant="caption">{date.toLocaleDateString()}</Typography>
        <Typography variant="caption">{date.toLocaleTimeString()}</Typography>
      </Box>
    </Paper>
  );
};
