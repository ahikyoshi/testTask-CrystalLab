import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField } from "@mui/material";
import { compressCommand, validateCommand } from "../../global_utils";
import { RootState } from "../../store/store";
import { setCurrentCommand } from "../../store/slices/manipulatorSlice";
import { newNote, setCurrentNote } from "../../store/slices/historySlice";

export const Controls = () => {
  const manipulator = useSelector((state: RootState) => state.manipulator);
  const history = useSelector((state: RootState) => state.history);
  const dispatch = useDispatch();

  const [command, setCommand] = useState("");
  const [isError, setIsError] = useState<{ status: boolean; text: string }>({
    status: false,
    text: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateCommand(command);

    setIsError(isValid);
    if (isValid.status) {
      return;
    }

    const compressed = compressCommand(command);
    dispatch(setCurrentCommand(command + "Б"));
    dispatch(newNote({ command: command, compressed: compressed }));
    dispatch(setCurrentNote(history.current + 1));
    setCommand("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(event.target.value);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2 }}
      display={"flex"}
      justifyContent={"center"}
      gap={2}
    >
      <TextField
        name="command"
        sx={{ maxWidth: 400 }}
        value={command}
        onChange={handleChange}
        placeholder="Введите команду"
        label="Командная строка"
        variant="outlined"
        error={isError.status}
        helperText={isError.status && isError.text}
        disabled={manipulator.isMoving}
        fullWidth
      />
      <Button type="submit" variant="contained" disabled={manipulator.isMoving}>
        {manipulator.isMoving ? "..." : "Отправить"}
      </Button>
    </Box>
  );
};
