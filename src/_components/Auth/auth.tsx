import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export const LoginForm = ({
  setIsAuth,
}: {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [authError, setAuthError] = useState("");

  const onSubmit = (data: FormData) => {
    const { email, password } = data;
    if (email === "admin" && password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuth(true);
    } else {
      localStorage.setItem("isAuthenticated", "false");
      setAuthError("Неверный логин или пароль");
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        bgcolor: "rgba(0,0,0,0.6)",
        zIndex: 1300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: 320,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        elevation={4}
      >
        <Typography variant="h6" textAlign="center">
          Авторизация
        </Typography>

        {authError && <Alert severity="error">{authError}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="login"
            {...register("email", { required: "Введите email" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            {...register("password", { required: "Введите пароль" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            Войти
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
