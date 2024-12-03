import { render, screen, fireEvent } from "@testing-library/react";
import { CompanyType } from "../types";
import CompanySelect from "../components/CompanySelect";

const mockCompanies: CompanyType[] = [
    {
        companyId: "1",
        name: "Company A",
        registrationNumber: "12345",
        countryOfIncorporation: "USA",
        businessType: "Technology",
        addressCountry: "USA",
        addressStreet: "123 Main St",
        addressStreetNumber: "101",
        addressZipCode: "10001",
        addressCity: "New York",
        verifiedDate: "2023-01-01",
        createdAt: "2020-01-01",
    },
    {
        companyId: "2",
        name: "Company B",
        registrationNumber: "67890",
        countryOfIncorporation: "Canada",
        businessType: "Finance",
        addressCountry: "Canada",
        addressStreet: "456 King Rd",
        addressStreetNumber: "202",
        addressZipCode: "A1A 1A1",
        addressCity: "Toronto",
        verifiedDate: "2023-02-01",
        createdAt: "2019-11-15",
    },
];

const mockOnSelectCompany = jest.fn();

describe("CompanySelect", () => {
    it("renders dropdown with companies", () => {
        render(
        <CompanySelect
            companies={mockCompanies}
            onSelectCompany={mockOnSelectCompany}
        />
        );

        expect(screen.getByRole("combobox")).toBeInTheDocument();
        expect(screen.getByText("Company A")).toBeInTheDocument();
        expect(screen.getByText("Company B")).toBeInTheDocument();
    });

    it("calls onSelectCompany when a company is selected", () => {
        render(
        <CompanySelect
            companies={mockCompanies}
            onSelectCompany={mockOnSelectCompany}
        />
        );

        fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

        expect(mockOnSelectCompany).toHaveBeenCalledWith("1");
    });
});
