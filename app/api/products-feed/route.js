"use server";
import { Cachedproducts } from "@/app/_connections/Getcachedata";

export async function GET() {
  try {
    const rawproducts = await Cachedproducts();
    const availableproducts = rawproducts.filter((p) => p.available);

    const products = availableproducts.map((p) => {
      let rawprice = Number(p?.sellingprice);
      p?.moreoptions?.forEach((moreoption) => {
        const selectedoption = moreoption?.options[0];
        rawprice += Number(selectedoption?.price);
      });
      const finalprice = rawprice || 0;

      return {
        id: p._id,
        title: p.productName?.replace(/,/g, " ") || "",
        description: p.descriptions?.[0]?.replace(/,/g, " ") || "",
        availability: Number(p.stocks) > 0 ? "in stock" : "out of stock",
        condition: "new",
        link: `https://urbanfryhomes.com/product/${p._id}`,
        image_link: p.variants?.[0]?.images?.[0] || "",
        additional_image_link: p.variants?.[0]?.images?.join(",") || "",
        brand: "Urbanfry Homes",
        shipping: `IN:::${0} INR`,
        price: `${finalprice} INR`,
        sale_price: "",
        // sale_price: p.mrp && p.mrp > finalprice ? `${p.mrp} INR` : "",
      };
    });

    const header = [
      "id",
      "title",
      "description",
      "availability",
      "condition",
      "link",
      "image_link",
      "additional_image_link",
      "brand",
      "shipping",
      "price",
      "sale_price",
    ];

    const rows = products.map((p) =>
      [
        p.id,
        p.title,
        p.description,
        p.availability,
        p.condition,
        p.link,
        p.image_link,
        p.additional_image_link,
        p.brand,
        p.shipping,
        p.price,
        p.sale_price,
      ]
        .map((field) => `"${String(field).replace(/"/g, '""')}"`) // escape quotes
        .join(",")
    );

    const csv = [header.join(","), ...rows].join("\n");

    return new Response(csv, {
      status: 200,
      headers: { "Content-Type": "text/csv" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Error generating feed", { status: 500 });
  }
}
