import { zodResolver } from "@hookform/resolvers/zod";
import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { registerSchema, type RegisterSchema } from "../../app/util/schemas/registerSchema";
import { useRegisterMutation } from "./accountApi";

export default function RegisterForm() {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await registerUser(data).unwrap();
    } catch (error) {
      const apiError = error as { message: string; };

      if (apiError.message && typeof apiError.message === "string") {
        const errorArray = apiError.message.split(",");

        errorArray.forEach(error => {
          if (error.includes("Password")) {
            setError("password", { message: error });
          } else if (error.includes("Email")) {
            setError("email", { message: error });
          }
        })
      }
    }
  }

  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
      <Box display="flex" flexDirection="column" alignItems="center" marginTop="8">
        <LockOutlined sx={{ mt: 3, color: "secondary.main", fontSize: 40 }} />
        <Typography variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          width="100%"
          display="flex"
          flexDirection="column"
          gap={3}
          marginY={3}
        >
          <TextField
            fullWidth
            label="Email"
            autoFocus
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button variant="contained" type="submit" disabled={!isValid} loading={isLoading}>
            Register
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?
            <Typography component={Link} to="/login" color="primary" sx={{ ml: 1 }}>Sign in</Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}