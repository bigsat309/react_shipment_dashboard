import React, { useState } from "react";
import { CompanyType } from "../types";

interface CompanySelectProps {
    companies: CompanyType[];
    onSelectCompany: (companyId: string) => void;
}

const CompanySelect: React.FC<CompanySelectProps> = ({
    companies,
    onSelectCompany,
}) => {
    const [selectedCompany, setSelectedCompany] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const companyId = e.target.value;
        setSelectedCompany(companyId);
        onSelectCompany(companyId);
    };

    return (
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Company
        </label>
        <select
            value={selectedCompany}
            onChange={handleChange}
            className="block w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-yellow-500 placeholder-gray-400"
        >
            <option value="">Select Company</option>
            {companies.map((company) => (
            <option key={company.companyId} value={company.companyId}>
                {company.name}
            </option>
            ))}
        </select>
        </div>
    );
};

export default CompanySelect;
