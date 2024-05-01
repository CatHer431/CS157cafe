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
export default function Root() {
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      navigate("/test2");
    } catch (err) {
      setError(err.response.data);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      navigate("/home");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Cafe Point of Sales System
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Group justify="space-between" mt="lg"></Group>
        <Button onClick={handleRegister} fullWidth mt="xl">
          Register
        </Button>
        <Button onClick={handleLogin} fullWidth mt="xl">
          Login
        </Button>
      </Paper>
    </Container>
  );
}
