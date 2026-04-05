import { zodResolver } from "@hookform/resolvers/zod";
import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { loginSchema, type LoginSchema } from "../../app/util/schemas/loginSchema";
import { useLazyUserInfoQuery, useLoginMutation } from "./accountApi";

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const [fetchUserInfo] = useLazyUserInfoQuery();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginSchema) => {
    await login(data);
    await fetchUserInfo();
    navigate(location.state?.from || "/catalog");
  }

  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
      <Box display="flex" flexDirection="column" alignItems="center" marginTop="8">
        <LockOutlined sx={{ mt: 3, color: "secondary.main", fontSize: 40 }} />
        <Typography variant="h5">
          Sign in
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
          <Button variant="contained" type="submit" loading={isLoading}>
           Sign in 
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don't have an account?
            <Typography component={Link} to="/register" color="primary" sx={{ ml: 1 }}>Sign up</Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}