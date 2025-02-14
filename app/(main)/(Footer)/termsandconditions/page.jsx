import React from "react";
import Underlineffect from "@/app/_globalcomps/Underlineffect";
import Link from "next/link";

export default function page() {
  return (
    <div className="pt-32 px-5 md:px-8">
      {/* navigations */}
      <div className="flex items-center gap-2 text-sm">
        <Underlineffect
          Comp={({ innercomp }) => <Link href="/">{innercomp}</Link>}
          title="Home"
          styles="w-fit"
        />{" "}
        / <p className="capitalize text-theme">Terms &amp; Conditions</p>
      </div>
      <div>
        <h1 className="font-tenor text-4xl md:text-6xl capitalize pt-10">
          Terms &amp; Conditions
        </h1>
      </div>
      <div className="policies">
        {/* Terms and Conditions */}
        <div>
          <h2>Terms and Conditions</h2>
          <p>
            ALL SALES AND DISCOUNTS apply ONLY to Alt Organisers branded
            products and do not apply to other brands or already marked-down
            SALE merchandise. Please read the following terms and conditions
            carefully, as your use of the services and any purchases made
            through the website signify your acceptance and compliance with
            these terms (&ldquo;Terms&rdquo;).
          </p>
          <p>
            The website allows you to browse, select, and purchase space
            organizers and accessories (&ldquo;Goods,&rdquo;
            &ldquo;Products,&rdquo; or &ldquo;Services&rdquo;).
          </p>
          <p>
            By using any of our services or making a purchase through the
            website, you agree to be legally bound by these Terms. Additionally,
            you may be subject to additional terms displayed alongside specific
            products or services. In the event of a conflict, the additional
            terms shall take precedence for that specific purchase.
          </p>
          <p>
            In these Terms, &ldquo;you&rdquo; or &ldquo;User&rdquo; refers to
            the end user accessing the website, its content, and the services
            offered through it. &ldquo;Service Providers&rdquo; refers to
            independent third-party service providers. &ldquo;We,&rdquo;
            &ldquo;us,&rdquo; and &ldquo;our&rdquo; shall refer to Alt
            Organisers.
          </p>
          <p>
            By visiting, using, or shopping on this website (or any future site
            operated by us), you accept these Terms. Additionally, when using
            other services affiliated with Alt Organisers or purchasing from
            third-party vendors listed on our site, you will be subject to their
            specific guidelines and terms. In case of inconsistencies, those
            specific guidelines will prevail.
          </p>
        </div>
        {/* Shipping & Delivery */}
        <div>
          <h2>Shipping &amp; Delivery</h2>
          <ol>
            <li>
              Estimated Shipping Times: Shipping estimates are provided on each
              product page. These are approximate and subject to product
              availability.
            </li>
            <li>
              Out of Stock/Backorder: If a product is out of stock or on
              backorder, we will notify you with a revised shipment date. At
              that time, you may choose to:
            </li>
            <ul>
              <li>Keep the order as is,</li>
              <li>Cancel the out-of-stock item, or</li>
              <li>Cancel the entire order.</li>
            </ul>
            <li>
              We strive to update you promptly about any delays or issues with
              shipping or production.
            </li>
          </ol>
        </div>
        {/* No Compensation Policy */}
        <div>
          <h2>No Compensation Policy</h2>
          <p>
            We maintain a strict No Compensation Policy as per our Return and
            Exchange policy. Compensation will not be provided for the following
            reasons:
          </p>
          <ul>
            <li>
              Variations in the finish or appearance of the final product.
            </li>
            <li>Delays in delivery due to unforeseen circumstances.</li>
            <li>
              Special, incidental, indirect, or consequential damages caused by
              a product.
            </li>
            <li>Missed opportunities to avail discounts or offers.</li>
            <li>Issues with delivery partners or personnel.</li>
            <li>Expired vouchers or discounts.</li>
            <li>Unavailability of certain items.</li>
          </ul>
          <p>
            Unreasonable or unlawful requests for compensation will be
            considered as loss-to-business cases. Alt Organisers reserves the
            right to cancel such orders and block user accounts without prior
            notice.
          </p>
        </div>
        {/* Product Variation */}
        <div>
          <h2>Product Variation</h2>
          <ol>
            <li>
              Finish &amp; Appearance: Alt Organisers disclaims guarantees of
              exactness in the finish or appearance of the product as seen on
              the website, as variations in imagery may occur.
            </li>
            <li>
              Color Accuracy: While we strive to display colors as accurately as
              possible, monitor settings may alter the color displayed. We
              cannot guarantee that your screen&rsquo;s display will match the
              actual product color.
            </li>
            <li>
              Alterations: Changes to your order (such as size, color, or
              product specifications) may be required due to product
              availability or variations in size charts.
            </li>
          </ol>
        </div>
        {/* Pricing */}
        <div>
          <h2>Pricing:</h2>
          <ol>
            <li>
              Product Prices: Prices listed on the website are in Indian Rupees
              and may change at the sole discretion of Alt Organisers.
            </li>
            <li>
              Revised Pricing: In accordance with company policies, prices may
              fluctuate based on stock replenishment, demand, or promotional
              offers.
            </li>
            <li>
              Incorporation into Terms: All pricing details are an integral part
              of these Terms.
            </li>
          </ol>
        </div>
        <p>
          By purchasing from Alt Organisers, you agree to these Terms and
          Conditions. We reserve the right to update or modify these terms
          without prior notice.
        </p>
      </div>
    </div>
  );
}
