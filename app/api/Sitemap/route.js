"use server";

import { Cachedproducts } from "@/app/_connections/Getcachedata";
import { staticdata, cities } from "@/app/commondata";
const domain = "https://altorganisers.com";

// Utility functions
const xmlEscape = (str) =>
  str
    ?.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const urlEncode = (str) => encodeURIComponent(str).replace(/%20/g, "-");

const baseurl = {
  loc: `${domain}`,
  lastmod: new Date().toISOString(),
  changefreq: "weekly",
  priority: "1.0",
};

// Generate city-specific URLs
const generateCityUrls = () =>
  cities.map((city) => ({
    loc: `${domain}?location=${urlEncode(city)}`,
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: "1.0",
  }));

// Generate category and subcategory URLs
const generateCategoryUrls = () => {
  const urls = [];
  cities.forEach((city) => {
    Object.keys(staticdata.categories).forEach((item) => {
      // Add category URL
      urls.push({
        loc: `${domain}/${urlEncode(item)}?location=${urlEncode(city)}`,
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: "0.8",
      });
    });
    Object.keys(staticdata.rooms).forEach((item) => {
      // Add category URL
      urls.push({
        loc: `${domain}/${urlEncode(item)}?location=${urlEncode(city)}`,
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: "0.8",
      });
    });
  });
  return urls;
};

// Generate product URLs
const generateProductUrls = (products, today) =>
  products.flatMap((product) =>
    product?.variants?.map((variant, index) => ({
      loc: `${domain}/${urlEncode(product.categories)}/${
        product?.sku
      }/${index}`,
      lastmod: today.toISOString(),
      changefreq: "weekly",
      priority: "0.8",
      image: variant?.images[0],
      name: product?.productName,
    }))
  );

export async function GET() {
  try {
    const allproducts = await Cachedproducts();
    const today = new Date();

    // Generate all URLs
    const cityUrls = generateCityUrls();
    const categoryUrls = generateCategoryUrls();
    const productUrls = generateProductUrls(allproducts, today);

    const allUrls = [baseurl, ...cityUrls, ...categoryUrls, ...productUrls];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allUrls
    .map(
      (url) => `
    <url>
      <loc>${xmlEscape(url.loc)}</loc>
      <lastmod>${url.lastmod}</lastmod>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
      ${
        url.image
          ? `
      <image:image>
        <image:loc>${xmlEscape(url.image)}</image:loc>
        <image:caption>${xmlEscape(url.name)}</image:caption>
        <image:title>${xmlEscape(url.name)}</image:title>
      </image:image>
      `
          : ""
      }
    </url>
  `
    )
    .join("")}
</urlset>`;

    // Return sitemap as response
    return new Response(sitemap, {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
