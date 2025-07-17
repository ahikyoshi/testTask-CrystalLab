import { Box, List, ListItem, Paper, Typography } from "@mui/material";

export const Rules = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} p={2} gap={2}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Управление
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            maxHeight: 200,
            alignContent: "flex-start",
          }}
        >
          {[
            "Л — Влево",
            "П — Вправо",
            "В — Вверх",
            "Н — Вниз",
            "О — Захватить образец",
            "Б — Положить образец",
          ].map((item, index) => {
            return (
              <Box key={index} sx={{ width: "50%", mb: 1 }}>
                {item}
              </Box>
            );
          })}
        </Box>
      </Paper>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Правила
        </Typography>
        <List dense>
          <ListItem>1. Не брать больше одного образца за одну команду</ListItem>
          <ListItem>2. Не кладите образец на другой образец</ListItem>
        </List>
      </Paper>
    </Box>
  );
};
