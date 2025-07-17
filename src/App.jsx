import React, { useEffect, useState } from "react";

import { Board } from "./_components/Board/Board";
import { Controls } from "./_components/Controls/Controls";
import { Header } from "./_components/Header/Header";
import { History } from "./_components/History/History";
import { Box } from "@mui/material";
import { Rules } from "./_components/Rules/Rules";
import { SnackbarLayout } from "./_components/SnackbarLayout/SnackbarLayout";
import { LoginForm } from "./_components/Auth/auth";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    document.title = "Crystal Lab";
    const value = localStorage.getItem("isAuthenticated");
    setIsAuth(value === "true");
  }, []);

  return (
    <main className="app">
      <Header />
      <Box display={"flex"} flexGrow={1}>
        <History />
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"100%"}
          height={"calc(100vh - 70px)"}
        >
          <Board />
          <Controls />
        </Box>
        <Rules />
      </Box>
      <SnackbarLayout />
      {!isAuth && <LoginForm setIsAuth={setIsAuth} />}
    </main>
  );
}

export default App;
