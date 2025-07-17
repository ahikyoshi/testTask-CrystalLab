import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { setSpeed } from "../../store/slices/manipulatorSlice";
import { RootState } from "../../store/store";

export const Header = () => {
  const dispatch = useDispatch();
  const manipulator = useSelector((state: RootState) => state.manipulator);

  const handleSpeedChange = (
    event: MouseEvent<HTMLElement>,
    newSpeed: number | null,
  ) => {
    if (newSpeed != null) {
      dispatch(setSpeed(newSpeed));
    }
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h4">Cristal lab</Typography>
        <Typography variant="caption">Разработчик: Александр Белый</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            Скорость:
          </Typography>
          <ToggleButtonGroup
            value={manipulator.speed}
            exclusive
            onChange={handleSpeedChange}
            size="small"
            color="primary"
            sx={{
              "& .MuiToggleButton-root": {},
              "& .Mui-selected": {
                color: "grey",
              },
            }}
          >
            <ToggleButton value={1}>1x</ToggleButton>
            <ToggleButton value={2}>2x</ToggleButton>
            <ToggleButton value={4}>4x</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
