import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack, Typography } from "@mui/material";
import { HistoryItem } from "./HistoryItems";
import { RootState } from "../../store/store";
import { motion } from "framer-motion";
import { setNote } from "../../store/slices/historySlice";

export const History = () => {
  const dispatch = useDispatch();

  const history = useSelector((state: RootState) => state.history);
  const manipulator = useSelector((state: RootState) => state.manipulator);

  useEffect(() => {
    if (!manipulator.isLoading) return;

    const prevNote = history.all[history.current - 1];
    if (!prevNote || !manipulator.transfers) return;

    const updatedNote = {
      ...prevNote,
      diamond_id: manipulator.transfers.id,
      diamond_pos: {
        ...prevNote.diamond_pos,
        before: manipulator.transfers.pos,
      },
    };

    dispatch(setNote(updatedNote));
  }, [manipulator.isLoading, manipulator.transfers]);

  return (
    <Box
      p={2}
      minWidth={390}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Typography variant="h4" align="center" mb={2}>
        {history.all.length != 0 && "История"}
      </Typography>

      <Stack
        spacing={2}
        sx={{
          height: "80vh",
          overflowY: "auto",
          pr: 1,
        }}
      >
        {history.all.map((note, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <HistoryItem note={note} />
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
};
