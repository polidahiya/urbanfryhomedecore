"use server";
import { Cachedproducts } from "@/app/_connections/Getcachedata";

const Searchedproductsfn = async (searchQuery) => {
  let allproducts = await Cachedproducts();
  //   const filteredproducts = allproducts.filter((product) =>
  //     product?.productName.toLowerCase().includes(text?.toLowerCase())
  //   );
  //   return filteredproducts;

  const words = searchQuery?.split(" ") || [];

  // Filtering products based on the search query
  words.forEach((word) => {
    if (word.trim() !== "") {
      allproducts = allproducts.filter((product) => {
        const nameMatch = product?.productName
          ?.toLowerCase()
          .includes(word.toLowerCase());

        const keyfeaturesMatch = product?.keyfeatures?.some((descItem) =>
          descItem.toLowerCase().includes(word.toLowerCase())
        );

        const keywordsMatch = product?.keywords
          ?.toLowerCase()
          .includes(word.toLowerCase());

        const categoryMatch = product?.categories
          ?.toLowerCase()
          .includes(word.toLowerCase());

        const roomsMatch = product?.rooms
          ?.toLowerCase()
          .includes(word.toLowerCase());

        const skuMatch = product?.sku
          ?.toLowerCase()
          .includes(word.toLowerCase());

        return (
          nameMatch ||
          keyfeaturesMatch ||
          keywordsMatch ||
          categoryMatch ||
          roomsMatch ||
          skuMatch
        );
      });
    }
  });

  // Sorting the filtered products
  return allproducts.sort((a, b) => {
    const nameA = a?.productName?.toLowerCase();
    const nameB = b?.productName?.toLowerCase();
    const lowerQuery = searchQuery?.toLowerCase();

    if (nameA.includes(lowerQuery) && !nameB.includes(lowerQuery)) {
      return -1;
    } else if (!nameA.includes(lowerQuery) && nameB.includes(lowerQuery)) {
      return 1;
    } else {
      return 0;
    }
  });
};

// {
//     "_id": "67725345c57ca2099444db12",
//     "categories": "Pantry-Organizers",
//     "rooms": "Living-Room",
//     "productName": "Utilities for controlling the tracking (letter spacing) of an element.",
//     "sku": "sku-12345",
//     "handlingtime": "10-15 days",
//     "mrp": "9998",
//     "sellingprice": "9000",
//     "Material": "test material",
//     "Warranty": "7",
//     "theme": "test theme",
//     "dimensions": [
//         "12x13x18",
//         "14x15x15"
//     ],
//     "weight": "99",
//     "keyfeatures": [
//         "this is a key feature",
//         "this is a key feature",
//         "this is a key feature"
//     ],
//     "descriptions": [
//         "this is a  test description"
//     ],
//     "variants": [
//         {
//             "finish": "Honey Oak",
//             "images": [
//                 "https://res.cloudinary.com/dz5gmpfoe/image/upload/v1735545668/Altorganizer/products/glggfraxktotiyxhtnn0.jpg",
//                 "https://res.cloudinary.com/dz5gmpfoe/image/upload/v1735545806/Altorganizer/products/xmgrbirmpeuywc8rksvz.webp"
//             ]
//         }
//     ],
//     "seotitle": "this is  a test title",
//     "seodescription": "this is a test seo desctiption",
//     "seokeywords": "jdfs df ds f sd f dsf dsf sdf",
//     "available": true,
//     "lastupdated": 1735545807594
// }

export default Searchedproductsfn;
