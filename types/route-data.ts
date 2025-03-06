export type ItemProps = {
  id: string;
  companyName: string;
  vin: string;
  address: string;
  type: "PICKUP" | "DROP-OFF";
  status: "PICKUP" | "DROP-OFF" | "TRANSIT" | "COMPLETED";
};
