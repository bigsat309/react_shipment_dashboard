import React, { useEffect, useState } from "react";
import CompanySelect from "./components/CompanySelect";
import ShipmentsList from "./components/ShipmentsList";
import ShipmentDetailsModal from "./components/ShipmentDetailsModal";
import { CompanyType, ShipmentType, ShipmentDetailType } from "./types";
import { fetchJSON } from "./utils/fetchData";

const App: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [shipments, setShipments] = useState<ShipmentType[]>([]);
  const [shipmentDetails, setShipmentDetails] =
    useState<ShipmentDetailType | null>(null);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>("");

  useEffect(() => {
    const loadCompanies = async () => {
      const data = await fetchJSON("companies.json");
      setCompanies(data);
    };
    loadCompanies();
  }, []);

  useEffect(() => {
    const loadShipments = async () => {
      if (selectedCompanyId) {
        const data = await fetchJSON("shipments.json");
        const filteredShipments = data.filter(
          (shipment: ShipmentType) =>
            shipment.partnerCompanyId === selectedCompanyId
        );
        setShipments(filteredShipments);
      }
    };
    loadShipments();
  }, [selectedCompanyId]);

  const loadShipmentDetails = async (shipmentId: string) => {
    const data = await fetchJSON(
      shipmentId === "494dfca9-77fd-405c-b12e-6a3266e34a66"
        ? "shipments_details_2.json"
        : "shipments_details_1.json"
    );
    const detail = data.find(
      (d: ShipmentDetailType) => d.shipmentId === shipmentId
    );
    setShipmentDetails(detail || null);
  };

  const handleSelectShipment = (shipmentId: string) => {
    setSelectedShipmentId(shipmentId);
    loadShipmentDetails(shipmentId);
  };

  const handleCloseModal = () => {
    setShipmentDetails(null);
    setSelectedShipmentId("");
  };

  return (
    <div className="min-h-screen bg-green-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Shipment Dashboard
      </h1>

      <div className="flex space-x-6">
        <div className="w-[10%]">
          <CompanySelect
            companies={companies}
            onSelectCompany={setSelectedCompanyId}
          />
        </div>

        <div className="w-[90%]">
          <ShipmentsList
            shipments={shipments}
            onSelectShipment={handleSelectShipment}
          />
        </div>
      </div>

      { selectedShipmentId && (
        <ShipmentDetailsModal
          shipment={shipments.find((s) => s.shipmentId === selectedShipmentId)!}
          details={shipmentDetails || undefined}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
