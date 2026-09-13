import { describe, test, expect } from "vitest";
import { validarEmail, validarNombre, validarEdad } from "../utils/validator.js";


describe("validarEmail", () => {
  test("acepta email valido", () => {
    expect(validarEmail("test@example.com")).toBe(null);
  });

  test("Rechaza email sin @", () => {
    expect(validarEmail("testexample.com")).toContain("inválido");
  });

  test("rechaza email vacío", () => {
    expect(validarEmail("")).toContain("requerido");
  });

  test("rechaza email null", () => {
    expect(validarEmail(null)).toContain("requerido");
  });

  test("Rechaza email sin dominio", () => {
    expect(validarEmail("test@")).toContain("inválido");
  });
});

describe("validarNombre", () => {
  test("acepta nombre válido", () => {
    expect(validarNombre("Juan Pérez")).toBe(null);
  });

  test("rechaza nombre undefined", () => {
    expect(validarNombre(undefined)).toContain("requerido");
  });

  test("rechaza nombre vacío", () => {
    expect(validarNombre("")).toContain("vacío");
  });

  test("rechaza nombre solo espacios", () => {
    expect(validarNombre("   ")).toContain("vacío");
  });

  test("rechaza nombre de 1 carácter", () => {
    expect(validarNombre("J")).toContain("entre 2 y 100");
  });

  test("rechaza nombre que no es string", () => {
    expect(validarNombre(123)).toContain("texto");
  });
});