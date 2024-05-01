import {
  TextInput,
  Input,
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
export function Test2() {
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    username: "",
    password: "",
  });
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/register", {
        name,
        role,
        username,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Sign Up!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Name"
          placeholder="Tom Donald"
          required
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          //onChange={handleChange}
        />
        <Select
          label="Role"
          placeholder="Pick Value"
          required
          data={["Admin", "Manager", "Staff"]}
          value={role}
          onChange={setRole}
          //onChange={handleChange}
        />
        <TextInput
          name="username"
          label="Username"
          placeholder="tDonald"
          required
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          //onChange={handleChange}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          //onChange={handleChange}
        />
        <Group justify="space-between" mt="lg"></Group>
        <Button onClick={handleSubmit} fullWidth mt="xl">
          Register
        </Button>
      </Paper>
    </Container>
  );
}
