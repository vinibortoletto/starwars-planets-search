import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import PLANETS_MOCK from "./mocks/planets.mock";
import App from "../App";
import { PlanetsProvider } from "../contexts/PlanetsContext";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  beforeEach(async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        json: async () => Promise.resolve(PLANETS_MOCK),
      })
    );

    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  });

  it("1. should call api on mount", async () => {
    const endpoint = "https://swapi.dev/api/planets";
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(endpoint);
  });

  it("2. should render a table with planets info", async () => {
    const theads = screen.getAllByTestId("thead");
    const tbodies = screen.getAllByTestId("tbody");
    const planetKeys = Object.keys(PLANETS_MOCK.results[0]);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(theads).toHaveLength(planetKeys.length);
    expect(tbodies).toHaveLength(PLANETS_MOCK.results.length);
  });

  it("3. should be able to search planets by text", async () => {
    const nameFilterInput = screen.getByTestId("name-filter");
    expect(nameFilterInput).toBeInTheDocument();
    expect(nameFilterInput).toHaveValue("");

    const firstPlanetName = PLANETS_MOCK.results[0].name;
    userEvent.type(nameFilterInput, firstPlanetName.toLowerCase());
    expect(screen.getByText(firstPlanetName)).toBeInTheDocument();
  });

  it("4. should render column select field", async () => {
    const optionsList = [
      "population",
      "orbital_period",
      "diameter",
      "rotation_period",
      "surface_water",
    ];

    const selectField = screen.getByTestId("column-filter");
    expect(selectField).toBeInTheDocument();
    expect(selectField.type).toBe("select-one");
    expect(selectField.value).toBe(optionsList[0]);

    const optionsFields = selectField.childNodes;
    optionsFields.forEach((option, index) => {
      expect(option.innerHTML).toBe(optionsList[index]);
    });
  });

  it("5. should render comparison select field", async () => {
    const optionsList = ["maior que", "menor que", "igual a"];

    const selectField = screen.getByTestId("comparison-filter");
    expect(selectField).toBeInTheDocument();
    expect(selectField.type).toBe("select-one");
    expect(selectField.value).toBe(optionsList[0]);

    const optionsFields = selectField.childNodes;
    optionsFields.forEach((option, index) => {
      expect(option.innerHTML).toBe(optionsList[index]);
    });
  });

  it("6. should render value input field", () => {
    const inputField = screen.getByTestId("value-filter");
    expect(inputField).toBeInTheDocument();
    expect(inputField.type).toBe("number");
    expect(inputField.value).toBe("0");
  });

  it("7. should render form button", () => {
    const button = screen.getByTestId("button-filter");
    expect(button.innerHTML).toBe("Filtrar");
    expect(button.type).toBe("submit");
    expect(button.disabled).toBe(false);
  });

  it("8. should be able to add multiple filters", () => {
    const columnField = screen.getByTestId("column-filter");
    const comparisonField = screen.getByTestId("comparison-filter");
    const valueField = screen.getByTestId("value-filter");
    const filterButton = screen.getByTestId("button-filter");

    userEvent.click(filterButton);
    expect(screen.getAllByTestId("tbody").length).toBe(8);

    userEvent.selectOptions(columnField, "orbital_period");
    userEvent.selectOptions(comparisonField, "menor que");
    userEvent.type(valueField, "{selectall}{del}400");
    userEvent.click(filterButton);
    expect(screen.getAllByTestId("tbody").length).toBe(4);

    userEvent.selectOptions(columnField, "diameter");
    userEvent.selectOptions(comparisonField, "igual a");
    userEvent.type(valueField, "{selectall}{del}10465");
    userEvent.click(filterButton);
    expect(screen.getAllByTestId("tbody").length).toBe(1);
  });

  it('9. should be able to remove a filter', () => {
    userEvent.click(screen.getByTestId("button-filter"));
    userEvent.click(screen.getByTestId("button-filter"));

    expect(screen.getAllByTestId("filter").length).toBe(2);

    userEvent.click(screen.getAllByTestId('remove-filter-btn')[0]);
    expect(screen.getAllByTestId("filter").length).toBe(1);
    userEvent.click(screen.getAllByTestId('remove-filter-btn')[0]);
    expect(screen.queryAllByTestId("filter").length).toBe(0);
  });

  it('10. should be able to remove all filters at once', () => {
    userEvent.click(screen.getByTestId("button-filter"));
    userEvent.click(screen.getByTestId("button-filter"));
    userEvent.click(screen.getByTestId('button-remove-filters'))
    expect(screen.queryAllByTestId("filter").length).toBe(0);
  });
});
