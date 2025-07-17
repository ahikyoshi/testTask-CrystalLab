import { Alert, Box, Snackbar, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { deleteSnack } from "../../store/slices/snacksSlice";

export const SnackbarLayout = () => {
  const dispatch = useDispatch()
  const snacks = useSelector((state: RootState) => state.snacks);

  const hasSnacks = snacks.length > 0;

  return (
    <Snackbar
      open={hasSnacks}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={2000}
    >
      <Box>
        <Stack spacing={1}>
          {snacks.map((snack) => {
            setInterval(() => {
              dispatch(deleteSnack(snack.id));
            }, 3000);
            return (
              <Alert
                key={snack.id}
                severity={snack.status}
                variant="filled"
                sx={{ minWidth: 300 }}
              >
                {snack.message}
              </Alert>
            );
          })}
        </Stack>
      </Box>
    </Snackbar>
  );
};
