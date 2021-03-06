//TEST for search.js
// dependecies
import React from "react";
import { render, fireEvent } from "@testing-library/react";
// jest
import "@testing-library/jest-dom/extend-expect";
import Search from "./Search";

//Determines if all sections are present 
describe("search", () => {
	test("verify input is given", async () => {
		const searchNameFieldId = "search-name-field";
		const nameValue = "test search";
		var name = "";
		const setValue = (value) => {
			name = value;
			console.log(value);
		};
		const { baseElement, getByTestId } = render(
			<Search value={nameValue} onValueChange={setValue} />
		);
		expect(baseElement).toBeInTheDocument();
		expect(baseElement).toBeVisible();
		expect(getByTestId(searchNameFieldId)).not.toBeNull();
		expect(getByTestId(searchNameFieldId)).toHaveValue(nameValue);
		const testInputValue = "Pizza";
		fireEvent.change(getByTestId(searchNameFieldId), {
			target: { value: testInputValue },
		});
		expect(name).toEqual(testInputValue);
	});
});
