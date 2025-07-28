import Nextimage from "../_globalcomps/Nextimage";

const imagesizes = {
  mobile: { height: 400, width: 400 },
  tablet: { height: 400, width: 900 },
  desktop: { height: 400, width: 1920 },
};
function Madeinindia({ device }) {
  return (
    <div className="relative w-full h-96 mt-10">
      <Nextimage
        src="/uiimages/madeinindiaimage.jpg"
        alt="Made in India"
        height={imagesizes[device].height || 400}
        width={imagesizes[device].width || 400}
        className="absolute inset-0 h-full w-full object-cover brightness-50"
      />
      <div className="absolute flex flex-col justify-center lg:justify-end gap-5 inset-0 text-white p-5 md:p-10">
        <h2 className="font-tenor text-4xl md:text-6xl">
          Proudly Made in India!
        </h2>
        <p>
          We take great pride in relying solely on Indian resources and skilled
          manpower throughout our supply chain.
        </p>
      </div>
    </div>
  );
}

export default Madeinindia;
