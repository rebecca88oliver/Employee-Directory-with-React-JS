//TEST for search TABLE 
// dependecies
import React from "react";
import { render, fireEvent } from "@testing-library/react";
// jest
import "@testing-library/jest-dom/extend-expect";
import SearchTable from "./SearchTable";
import data from "./../../test-data.json";

//Determines if all desired sections are present. 
describe("table", () => {
	test("Table is in the document", async () => {
		const { baseElement } = render(<SearchTable data={data.results} />);
		expect(baseElement).toBeInTheDocument();
		expect(baseElement).toBeVisible();
	});
});
