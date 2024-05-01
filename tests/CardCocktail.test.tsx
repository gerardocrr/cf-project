import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardCocktail } from "../src/components/CardCocktail";
import React from "react";
import { MemoryRouter } from "react-router-dom";

test("Renderización de imagen y título en CardCocktail", () => {
  // Datos de ejemplo para simular un cóctel
  const cocktailData = {
    id: 1,
    title: "Margarita",
    urlImage: "margarita.jpg",
  };

  // Renderiza el componente CardCocktail con los datos simulados
  render(
    <MemoryRouter>
      <CardCocktail
        key={cocktailData.id}
        title={cocktailData.title}
        urlImage={cocktailData.urlImage}
        id={cocktailData.id}
      />
    </MemoryRouter>
  );

  // Verifica que la imagen se renderice correctamente
  const imageElement = screen.getByAltText(
    cocktailData.title
  ) as HTMLImageElement;
  expect(imageElement.src).toContain(cocktailData.urlImage);

  // Verifica que el título se renderice correctamente
  const titleElement = screen.getByText(cocktailData.title);
});
