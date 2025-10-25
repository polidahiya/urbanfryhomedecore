"use client";
import React, { useState, useEffect } from "react";
import Productcard from "@/app/_globalcomps/_productcard/Productcard";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BiSortAlt2 } from "react-icons/bi";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { Sortproductsaction } from "../../Sortproductsaction";
import { AppContextfn } from "@/app/Context";
import Productgrid from "../Productgrid";

function SortableItem({ id, product }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      className="w-full"
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="group relative w-full h-full md:max-w-80">
        <div className="relative">
          <div className="w-full aspect-square relative block overflow-hidden">
            <Nextimage
              src={product?.variants[0]?.images[0] || "/uiimages/404.jpg"}
              alt={product?.productName}
              className="h-full w-full absolute object-cover"
              height={500}
              width={500}
              loading="lazy"
            />
          </div>
        </div>
        <div className="px-0 pt-3">
          <div className="mt-[6px]">
            <p className="line-clamp-2 text-sm md:text-base">
              {product?.productName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sortablegrid({ initialProducts, sortkey }) {
  const { setmessagefn } = AppContextfn();
  const [products, setProducts] = useState(initialProducts);
  const [sortproducts, setsortproducts] = useState(false);
  const [loading, setloading] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setProducts((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  async function handleSave() {
    setloading(true);
    const res = await Sortproductsaction(products, sortkey);
    setmessagefn(res?.message);
    setloading(false);
    if (res.status === 200) setsortproducts(false);
  }

  // 🔹 During SSR / before hydration — render static grid only
  if (!sortproducts) {
    return (
      <div className="my-10">
        <Sortbutton
          sortproducts={sortproducts}
          setsortproducts={setsortproducts}
        />
        <Productgrid products={initialProducts} />
      </div>
    );
  }

  // 🔹 After mount — enable drag-and-drop
  return (
    <div className="my-10">
      <Sortbutton
        sortproducts={sortproducts}
        setsortproducts={setsortproducts}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={products.map((p) => p._id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-start gap-x-2 gap-y-16">
            {products.map((product) => (
              <SortableItem
                key={product._id}
                id={product._id}
                product={product}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {sortproducts && (
        <div className="mt-6 sticky bottom-3 flex items-center justify-center">
          <button
            onClick={handleSave}
            className="bg-theme text-white px-6 py-2 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="block w-5 h-5 border-b-2 border-t-2 rounded-full border-white animate-spin"></span>
            )}
            <span> Save Order</span>
          </button>
        </div>
      )}
    </div>
  );
}

const Sortbutton = ({ sortproducts, setsortproducts }) => {
  return (
    <button
      className="fixed top-24 right-16 bg-theme text-white border border-white rounded-full w-10 aspect-square hidden lg:flex items-center justify-center z-20"
      onClick={() => setsortproducts((pre) => !pre)}
    >
      {sortproducts ? <span>X</span> : <BiSortAlt2 />}
    </button>
  );
};
