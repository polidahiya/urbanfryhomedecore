import React from "react";
import Underlineeffect from "@/app/_globalcomps/Underlineeffect";
import Link from "next/link";

function page() {
  return (
    <div className="pt-32 px-5 md:px-8">
      {/* navigations */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/" className="">
          <Underlineeffect title="Home" />
        </Link>
        / <p className="capitalize text-theme">Shipping and Return Policy</p>
      </div>
      <div>
        <h1 className="font-tenor text-4xl md:text-6xl capitalize pt-10">
          Shipping and Return Policy
        </h1>
      </div>
      <div className="policies">
        {/* SHIPPING */}
        <div>
          <h2>SHIPPING:</h2>
          <ul>
            <li>We ship anywhere within India.</li>
            <li>
              International shipping is available. Please reach out to us via
              email for international shipping options.
            </li>
          </ul>
        </div>
        <p>
          Once an order has been shipped from our warehouse, Alt Organisers
          cannot be held responsible for any delays or damages during transit.
          While we ensure secure packaging and provide accurate shipping
          estimates, unforeseen circumstances beyond our control may impact
          delivery.
        </p>
        {/* CASH ON DELIVERY */}
        <div>
          <h2>CASH ON DELIVERY (COD):</h2>
          <ul>
            <li>COD is available for orders below ₹10,000.</li>
            <li>(Applicable only for Alt Organisers products.)</li>
          </ul>
        </div>
        {/* PROCESSING TIME: */}
        <div>
          <h2>PROCESSING TIME:</h2>
          <ul>
            <li>
              Items in stock and ready to ship are typically processed within
              2-4 business days.
            </li>
            <li>
              Made-to-order or customized items are commissioned at the time of
              order placement and may take 3-4 weeks for production and
              shipping.
            </li>
          </ul>
        </div>
        {/* RETURNS: */}
        <div id="return">
          <h2>RETURNS:</h2>
          <ul>
            <li>
              Returns are accepted for defective or damaged products free of
              charge, provided they are in their original packaging. Please
              inspect your order upon arrival and report any damage within 48
              hours of delivery.
            </li>
            <li>
              Returns for cushions and throws must also be requested within 48
              hours of delivery. Reverse shipping fees will apply, and store
              credit will be issued for the value of the returned item.
            </li>
            <li>
              Products must be returned unused and in the same condition as
              received within 1 week of delivery.
            </li>
            <li>
              A return shipping fee of 10% of the product cost will be deducted
              for all other return requests, and store credit will be issued for
              the remaining balance.
            </li>
            <li>
              Items marked as ‘Final Sale’ or ‘Non-Returnable’ cannot be
              returned.
            </li>
          </ul>
        </div>
        <p>
          Affiliate brand products and made-to-order items follow their own
          return terms. Please refer to individual product details.
        </p>
        {/* REFUNDS: */}
        <div>
          <h2>REFUNDS:</h2>
          <ul>
            <li>
              Refunds are evaluated on a case-by-case basis. If approved,
              refunds or store credits will be processed within 15 working days
              of receiving and inspecting the returned goods.
            </li>
            <li>
              Transaction fees of 5% will not be refunded under any
              circumstances for cancellations, reversals, or refunds.
            </li>
            <li>
              In cases where the customer refuses to accept an order at the time
              of delivery, 20% of the order value will be deducted, and the
              remaining amount will be refunded.
            </li>
          </ul>
        </div>
        {/* CANCELLATION POLICY: */}
        <div>
          <h2>CANCELLATION POLICY:</h2>
          <ul>
            <li>Orders cannot be canceled after 24 hours of placement.</li>
            <li>
              Custom-made or commissioned items cannot be canceled or returned.
            </li>
          </ul>
        </div>
        {/* RETURNING A GIFT: */}
        <div>
          <h2>RETURNING A GIFT:</h2>
          <p>
            We apologize if your gift wasn’t suitable. While store credit cannot
            be issued for returned gift items, we are happy to process a gift
            exchange for another item of your choice.
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
