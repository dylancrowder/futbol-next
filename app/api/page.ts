import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Nombre del equipo es requerido" });
    }

    const data = await Team.create({ name });

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: "Error al crear el equipo", error: error.message });
  }
}
