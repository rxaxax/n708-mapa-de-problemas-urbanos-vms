import api from "./api";

export async function createReport(data: {
  title: string;
  description: string;
  location: { lat: number; lng: number };
  category: string;
}) {
  const res = await api.post("/reports", data);
  return res.data;
}

export async function getAllReports() {
  const res = await api.get("/reports");
  return res.data;
}

export async function getReportById(id: string) {
  const res = await api.get(`/reports/${id}`);
  return res.data;
}
