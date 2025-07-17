import { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { move } from "./utils";
import {
  setLoading,
  setMoving,
  setPos,
} from "../../store/slices/manipulatorSlice";
import { setPosition } from "../../store/slices/diamondsSlice";
import { Box } from "@mui/material";
import { setSnack } from "../../store/slices/snacksSlice";

export const Board = () => {
  const dispatch = useDispatch();
  const manipulator = useSelector((state: RootState) => state.manipulator);
  const diamonds = useSelector((state: RootState) => state.diamonds);

  useEffect(() => {
    if (manipulator.currentCommand.length === 0) return;

    let localCords = manipulator.pos;
    const expanded = Array.from(
      manipulator.currentCommand.replace(/(\d+)([А-ЯA-Z])/g, (_, count, char) =>
        char.repeat(Number(count)),
      ),
    );

    const run = async () => {
      dispatch(setMoving(true));

      for (let i = 0; i < expanded.length; i++) {
        const command = expanded[i];

        switch (command) {
          case "Л":
          case "П":
          case "В":
          case "Н": {
            const moveResult = move({ dir: command, pos: localCords });

            dispatch(setPos(moveResult.pos));

            if (!moveResult.success) {
              dispatch(
                setSnack({
                  id: Math.floor(Math.random() * 10000) + 1,
                  status: "error",
                  message: "Манипулятор упёрся в стену",
                }),
              );
            }

            localCords = moveResult.pos;
            break;
          }

          case "О": {
            const index = diamonds.findIndex(
              (d) => d.pos.x === localCords.x && d.pos.y === localCords.y,
            );
            if (index !== -1 && !manipulator.isLoading) {
              dispatch(setLoading([diamonds[index], true]));
            } else {
              dispatch(
                setSnack({
                  id: Math.floor(Math.random() * 10000) + 1,
                  status: "error",
                  message: manipulator.isLoading
                    ? "Манипулятор занят"
                    : "Под манипулятором нет алмаза",
                }),
              );
            }
            break;
          }

          case "Б":
            {
              dispatch(setLoading([null, false]));
            }
            break;
        }

        await new Promise((res) => setTimeout(res, 500 / manipulator.speed));
      }

      dispatch(
        setSnack({
          id: Math.floor(Math.random() * 10000) + 1,
          status: "success",
          message: "Операция успешно завершена",
        }),
      );
      dispatch(setMoving(false));
    };

    run();
  }, [manipulator.currentCommand]);

  useEffect(() => {
    if (manipulator.isLoading) {
      dispatch(setPosition([manipulator.pos, manipulator.transfers]));
    }
  }, [manipulator.pos]);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexGrow={1}
    >
      <Box position={"relative"}>
        <Box
          display={"grid"}
          sx={{
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: "repeat(7, 1fr)",
          }}
          width={700}
          height={700}
        >
          {Array.from({ length: 49 }).map((_, index) => {
            return (
              <Box
                sx={{
                  outline: "1px solid #362005",
                  backgroundColor: "#828282ff",
                }}
                width={100}
                height={100}
                key={index}
              />
            );
          })}
          <motion.div
            id="manipulator"
            style={{
              width: 100,
              height: 100,
              position: "absolute",
              outline: "2px solid rgb(110, 59, 0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            animate={{
              top: manipulator.pos.y * 100,
              left: manipulator.pos.x * 100,
            }}
          >
            <motion.img
              src="/hand.png"
              alt="hand"
              width={100}
              height={100}
              animate={manipulator.isLoading ? { scale: 0.55 } : { scale: 1 }}
            />
          </motion.div>
          {/* Diamonds */}
          {diamonds.map((diamonds, index) => {
            return (
              <Box
                width={100}
                height={100}
                position={"absolute"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                key={index}
              >
                <motion.div
                  style={{
                    width: 100,
                    height: 100,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  id={`diamond_${index}`}
                  animate={{
                    top: diamonds.pos.y * 100,
                    left: diamonds.pos.x * 100,
                  }}
                >
                  <img
                    src="/diamond.png"
                    alt="diamond"
                    width={60}
                    height={60}
                  />
                </motion.div>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
