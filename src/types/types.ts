export interface Company {
    companyId: string;
    name: string;
    registrationNumber: string;
    countryOfIncorporation: string;
    businessType: string;
    addressCountry: string;
    addressStreet: string;
    addressStreetNumber: string;
    addressZipCode: string;
    addressCity: string;
    verifiedDate: string;
    createdAt: string;
}

export interface Shipment {
    shipmentId: string;
    partnerCompanyId: string;
    referenceName: string;
    status: string;
    destinationName: string;
    departureName: string;
    plannedDeparture: string;
    plannedDestination: string;
}

export interface ShipmentDetail {
    shipmentId: string;
    lat: number;
    lng: number;
    temperature: { t: number; v: number | null }[];
    humidity: { t: number; v: number | null }[];
}