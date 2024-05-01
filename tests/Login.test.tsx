import { test } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Login } from "../src/components/Auth/Login";
import { MemoryRouter } from "react-router-dom";
import React from "react";

test("Login con credenciales válidas", async () => {
  const { getByLabelText, getByRole } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  // Encuentra los campos de usuario y contraseña y escribe en ellos
  const usuarioInput = getByLabelText("Username");
  const contraseñaInput = getByLabelText("Password");
  fireEvent.change(usuarioInput, { target: { value: "admin" } });
  fireEvent.change(contraseñaInput, { target: { value: "admin1234" } });

  // Encuentra y hace clic en el botón de enviar
  const enviarButton = getByRole("button", { name: "Sign in" });
  fireEvent.click(enviarButton);
});
