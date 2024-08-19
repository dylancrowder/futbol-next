import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Team from "@/models/Team";

interface Params {
  teamName: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  await dbConnect();

  try {
    console.log("este es el parametro de busqueda del endpoint" , params);

    // Encuentra el equipo por el nombre proporcionado en los parámetros
    const team = await Team.findOne({ name: params.teamName }).exec();
    console.log("este es el team desde el endpoint", team);

    // Si el equipo no se encuentra, devuelve un error 404
    if (!team) {
      return NextResponse.json(
        { message: "Equipo no encontrado" },
        { status: 404 }
      );
    }

    // Devuelve la información del equipo con un estado 200
    return NextResponse.json(team, { status: 200 });
  } catch (error: any) {
    console.error(error);
    // Devuelve un error 500 si ocurre una excepción
    return NextResponse.json(
      { message: "Error al recuperar el equipo", error: error.message },
      { status: 500 }
    );
  }
}
