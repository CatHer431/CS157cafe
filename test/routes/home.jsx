import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Select,
} from "@mantine/core";
import classes from "./AuthenticationTitle.module.css";
import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
export function AuthenticationTitle() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  //const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "login",
        {
          username,
          password,
          role,
        },
        { baseURL: "http://localhost:3001/", withCredentials: true, },
      );
      navigate("/dashboard");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" href="http://localhost:5173/test2">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="username"
          placeholder="jTodd"
          required
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Select
          label="Role"
          placeholder="Pick Value"
          required
          data={["Admin", "Manager", "Staff"]}
          value={role}
          onChange={setRole}
        />
        <Group justify="space-between" mt="lg"></Group>
        <Button onClick={handleSubmit} fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}

