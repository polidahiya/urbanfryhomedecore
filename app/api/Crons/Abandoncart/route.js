import { getcollection } from "@/app/_connections/Mongodb";

export async function GET() {
  const { servercart } = await getcollection();
  
  await servercart.updateMany(
    {
      updatedAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      status: "active",
    },
    { $set: { status: "abandoned" } }
  );

  return Response.json({ success: true });
}
