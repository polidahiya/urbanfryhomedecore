import { mail } from "@/app/commondata";
import { faqlist } from "@/app/page";

const Pagesdata = {
  Aboutus: {
    pagetitle: "About Us",
    content: (
      <>
        <p>
          <strong>
            Behind every piece at Urbanfry Homes lies a story — not of mass
            production, but of intention, emotion, and home.
          </strong>
        </p>
        <p>
          Urbanfry Homes was founded by{" "}
          <strong>Apoorv and Ruchi Shrivastava</strong>, a duo who chose passion
          over the predictable. Both MBA graduates with thriving corporate
          careers, they set out to build something deeply personal — a brand
          rooted in the belief that furniture shouldn{"’"}t just fill a space,
          it should tell a story, spark emotion, and bring lasting warmth to a
          home.
        </p>
        <p>
          What began as a simple idea — to create timeless, thoughtfully
          designed furniture using solid wood—has evolved into a growing
          movement of design-conscious living that{"’"}s proudly made in India,
          and made to last.
        </p>
        <p>
          While Apoorv always had an eye for structure and systems, Ruchi was
          drawn to aesthetics, stories, and spaces that breathe. Together, they
          realised there was a massive gap in the Indian furniture space:
          cookie-cutter MDF pieces dominated the market, and custom work was
          either overpriced or unpredictable.
        </p>
        <p>So they set out to change that—with a simple mission:</p>
        <p>
          <strong>
            "To organise the furniture industry by blending the charm of
            handcrafted wood with the consistency of a modern brand."
          </strong>
        </p>
        <p>
          From a small workshop in Gurugram to a full-fledged studio and
          warehouse setup, Urbanfry grew steadily—fueled by word-of-mouth,
          designer collaborations, and a growing tribe of customers who believed
          in <i>slow, solid, and stylish living</i>.
        </p>
        <p>
          Today, Urbanfry Homes works closely with{" "}
          <strong>
            interior designers, architects, home stylists, and builders
          </strong>
          , providing not just finished pieces but also custom creations,
          styling support, and collaborative design experiences.
        </p>
        <p>
          Because to us, furniture is more than form and function. <br /> It
          {"’"}s a way to turn everyday moments into something a little more
          beautiful, one home at a time.
        </p>
      </>
    ),
  },

  FAQs: {
    pagetitle: "FAQs",
    content: (
      <>
        {faqlist.map((item, i) => (
          <div key={i}>
            <h2>{item.question}</h2>
            {item.answer.map((item, j) => (
              <p key={j}>{item}</p>
            ))}
          </div>
        ))}
      </>
    ),
  },

  ShippingDelivery: {
    pagetitle: "Shipping & Delivery",
    content: (
      <>
        <h2>Measure Before You Buy</h2>
        <p>
          Before you place your order, we recommend taking a moment to check the
          space where the furniture will go. Each product page includes exact
          measurements—width, depth, and height. The easiest way to plan is by
          marking the area on your floor using tape or paper, just to see how
          the piece will fit
        </p>
        <p>
          Make sure there{"’"}s room for movement around it and that it won{"’"}
          t block doors, windows, or wall fixtures. For items with doors or
          drawers, check there{"’"}s enough space for them to open comfortably
        </p>
        <h2>Make Sure It Can Get In</h2>
        <p>
          Solid wood furniture can be large and heavy. Please double-check that
          your item can pass through <strong>doorways</strong>,{" "}
          <strong>hallways</strong>, <strong>lifts</strong>, or{" "}
          <strong>staircases</strong> in your home. Measure the height and width
          of these access points and compare them with the product{"’"}s size.
        </p>
        <p>
          If you live in an apartment or have tight stairways, we recommend
          planning ahead so there are no surprises on delivery day.
        </p>
        <h2>How Delivery Works</h2>
        <p>
          We ship across multiple cities in India using trusted logistics
          partners. While they usually try to call before delivery, we can{"’"}t
          always guarantee it. You'll receive tracking details once your order
          is dispatched so you can stay updated.
        </p>
        <p>
          If you're not available on the delivery day, just let us know in
          advance at <strong>{mail}</strong>.comand we{"’"}ll help reschedule.
          Always ensure that your <strong>address</strong>,{" "}
          <strong>contact number, and pin code</strong> are correct at checkout
          for smooth coordination.
        </p>
        <h2>Delivery to Your Floor</h2>
        <p>
          Furniture is delivered to the{" "}
          <strong>building entrance or ground floor</strong>. If there{"’"}s a
          working lift and the item fits, the delivery person may bring it up to
          your floor, but this isn{"’"}t a guaranteed service. Delivery
          personnel are not required to carry furniture up staircases, so please
          arrange extra help if needed.
        </p>
        <p>
          Also note: Our delivery team is not responsible for{" "}
          <strong>opening the packaging</strong> or waiting while you inspect
          the product
        </p>
        <h2>In Case of Damage</h2>
        <p>
          If you notice that the outer packaging is torn or damaged at the time
          of delivery, please <strong>click clear photos immediately</strong>{" "}
          and make a note of it with the delivery person. Then share the
          pictures and order details with us at <strong>{mail}</strong> within
          24 hours.
        </p>
        <p>
          Once you open the package, please inspect the product carefully. If
          there{"’"}s any issue, report it to us as soon as possible so we can
          assist you quickly.
        </p>
        <h2>Installation Support</h2>
        <p>
          For customers in{" "}
          <strong>Delhi NCR and other major metro cities</strong>, we provide
          <strong>free installation support</strong> at the time of delivery
        </p>
        <p>
          For other cities, we do not currently offer installation services.
          However, all our products are designed with{" "}
          <strong>simple, self-installable steps</strong>. You{"’"}ll find it
          easy to assemble with basic tools—and if needed, a local carpenter can
          help complete the setup in minutes.
        </p>
      </>
    ),
  },

  Warranty: {
    pagetitle: "Warranty Information",
    content: (
      <>
        <p>
          Urbanfry Homes offers a <strong>one-year limited warranty</strong> on
          all its furniture and sofa products, covering defects in materials and
          workmanship. This warranty is valid from the date of delivery and
          applies only to the original purchaser for residential
          (non-commercial) use. It guarantees the structural components (frames,
          joints, hardware, etc.) of the furniture; however, fabrics,
          upholstery, and leather are not covered by this warranty since their
          condition changes naturally with use. (For example, Urbanfry Homes
          provides a separate 6-year termite warranty on wooden furniture, but
          expressly excludes upholstery from coverage.) No cash refunds will be
          provided for defective items – covered claims will be fulfilled by
          repair or replacement only
        </p>
        <h2>Warranty Period</h2>
        <p>
          The Urbanfry Homes warranty period is{" "}
          <strong>one year from the date of delivery</strong>. The clock starts
          when the product is delivered to you, regardless of whether you
          install or use it immediately. Any repair or replacement made under
          warranty does not extend this one-year term. Once the one-year period
          expires, warranty coverage ends even if the item has never been used
          or installed. The warranty is non-transferable and applies only to the
          original purchaser.
        </p>
        <h2>Warranty Limitations</h2>
        <p>
          This limited warranty covers manufacturing and workmanship defects
          only. <strong>It excludes</strong> damages or defects caused by
          factors such as:
        </p>
        <ul>
          <li>
            <strong>Upholstery and fabrics</strong>: All sofas and chairs
            fabrics, leathers, covers and foam fillings are excluded from
            warranty. Normal wear (pilling, fading, stains) and any damage to
            upholstery is not covered; only the underlying frame/structure is
            warranted.
          </li>
          <li>
            <strong>Accidents or misuse</strong>: Any defect resulting from
            improper use or handling—such as dropping, impacts, overloading,
            vandalism, or unauthorized modifications—voids the warranty.
            Similarly, negligence or abuse (misuse, abuse, pets scratching,
            etc.) is not covered.
          </li>
          <li>
            <strong>Improper assembly or maintenance</strong>: Faulty assembly,
            installation errors, or use of the furniture beyond its intended
            purpose are not covered. Damage due to incorrect care (such as using
            harsh chemicals or abrasive cleaners) also voids the warranty.
          </li>
          <li>
            <strong>Normal wear and tear</strong>: Routine aging of the product
            is expected and excluded. This includes cushion settling, foam
            softening, fabric pilling, color fading, scratches from normal use,
            and other changes that occur over time. For example, cushion cores
            may soften with use and fabrics or leathers may fade – these are not
            considered defects.
          </li>
          <li>
            <strong>Environmental factors</strong>: Exposure to extreme
            conditions is excluded. Damage from direct sunlight, excessive heat
            or humidity, rapid temperature changes, or other unsuitable
            environments (e.g. placing wood furniture near radiators or
            un-shaded windows) is not covered.{" "}
          </li>
          <li>
            <strong>Commercial use</strong>: This warranty applies only to
            residential (home) use. Any use in commercial, industrial, rental or
            institutional settings (offices, stores, hotels, daycares, etc.) is
            excluded.
          </li>
          <li>
            <strong>Shipping or assembly damage</strong>: Damage incurred during
            shipping, handling, installation or assembly is not covered by this
            warranty. Customers should inspect goods upon delivery and report
            transit damage immediately (see Claim Procedure below). Costs for
            labor, delivery, or assembly are not covered.
          </li>
          <li>
            <strong>Natural material variations</strong>: Furniture made of
            natural materials (solid wood, veneer, stone, leather, etc.) may
            exhibit inherent variations (wood grain differences, knots, color
            differences, leather markings, glass bubbles, etc.). These natural
            characteristics and the development of a natural patina over time
            are not defects and are expressly excluded. For example, small
            bubbles or lines in handcrafted glass or grain variations in wood
            are normal and not covered.
          </li>
          <li>
            <strong>Unauthorized alterations</strong>: Any repairs, reupholster,
            refinishing or modifications performed by anyone other than Urbanfry
            Homes or its authorized service partners will void the warranty. (In
            other words, the warranty is void if the furniture is repaired,
            altered, or serviced by an unauthorized party.)
          </li>
          <li>
            <strong>Other exclusions</strong>: This warranty does not cover
            ordinary aesthetic damage such as chipping of powder-coated paint,
            minor dents, or polish wear. It also does not cover clearance, floor
            models, or items sold “as-is.”
          </li>
        </ul>
        <h2>Warranty Claim Procedure</h2>
        <p>To make a warranty claim, follow these steps:</p>
        <ol>
          <li>
            <strong>1. Report the defect</strong>: If you discover a defect
            covered by this warranty during the one-year period, notify Urbanfry
            Homes customer service immediately. Provide your order details,
            proof of purchase, and a description (and photos if possible) of the
            defect
          </li>
          <li>
            <strong>2. Repair or replacement</strong>: Upon receiving your
            report, Urbanfry Homes will inspect the issue. At its sole
            discretion, Urbanfry will either repair the defective part or
            replace the product with an equivalent item of equal value. All
            repairs or replacements are provided free of charge for parts and
            workmanship.
          </li>
          <li>
            <strong>3. Warranty duration</strong>: Any repair or replacement
            under this policy does not extend or renew the original one-year
            warranty period. The warranty remains based on the original delivery
            date.
          </li>
          <li>
            <strong>4. Original purchaser only</strong>: The warranty is valid
            only for the original purchaser with proof of purchase. It is
            non-transferable and void if the furniture is resold, transferred,
            or used by another party.
          </li>
          <li>
            <strong>5. No refunds</strong>: Urbanfry Homes will provide repair
            or replacement only. No cash refunds or credits are offered under
            this warranty. Urbanfry{"’"}s liability is strictly limited to
            repairing or replacing the furniture, and in no case will it exceed
            the original purchase price.
          </li>
          <li>
            <strong>6. Inspect upon delivery</strong>: You must inspect your
            furniture upon delivery. Any visible damage, defects, or incorrect
            items must be reported to Urbanfry Homes within 7 days of delivery.
            After 7 days, the product will be deemed accepted, and those issues
            will not be eligible under warranty
          </li>
          <p>
            Please keep your proof of purchase (sales receipt or order
            confirmation) handy, as it will be required for any warranty claim.
            Urbanfry Homes will make reasonable efforts to resolve warranty
            claims promptly. By using or retaining the product, you acknowledge
            you have read and agreed to this warranty.
          </p>
        </ol>
      </>
    ),
  },

  CareMaintenance: {
    pagetitle: "Care & Maintenance",
    content: (
      <>
        <ul>
          <li>
            <strong>Dust & Clean Gently</strong>: Dust wood surfaces daily/
            weekly with a soft microfiber or cotton cloth. For deeper cleaning,
            spray a gentle wood cleaner or a mild soap solution onto a cloth
            (never directly onto the wood) and wipe surfaces. Blot spills
            immediately and wipe dry to prevent water rings or stains.
          </li>
          <li>
            <strong>Polish & Condition</strong>: Use a high-quality furniture
            polish or natural wax occasionally to nourish and seal the finish.
            Apply sparingly in the direction of the grain, then buff with a soft
            cloth. This helps protect the wood from drying out and maintains its
            lustre over time.
          </li>
          <li>
            <strong>Avoid Harsh Elements</strong>: Keep wood furniture out of
            direct sunlight and away from heat sources (radiators, vents).
            Intense UV and heat will fade and crack the finish. Also avoid
            placing wood near humid exterior walls in monsoon – allow 6–8 inches
            of air space from damp walls to prevent moisture absorption.
          </li>
          <li>
            <strong>Use Protective Accessories</strong>: Always use coasters and
            placemats to shield wood from hot dishes and wet cups. Attach felt
            pads under legs to prevent scratches on floors. When moving
            furniture, lift it rather than drag it to protect the joints and
            flooring.
          </li>
          <li>
            <strong>Seasonal Care (Humidity)</strong>: In humid/rainy seasons,
            keep rooms well-ventilated (open windows or use a dehumidifier) to
            prevent swelling and mildew. Dust and wipe surfaces with a dry cloth
            frequently to remove dampness. After the monsoon, apply a fresh coat
            of furniture wax or oil—this seals the wood and repels moisture.
          </li>
          <li>
            <strong>What to Avoid</strong>: Never use strong solvents, bleach or
            ammonia-based cleaners on wood. Don{"’"}t let liquid sit on the
            surface. Avoid abrasive sponges or scouring pads. And remember: don
            {"’"}t place wood furniture in hot kitchens or steamy bathrooms
            where heat and moisture damage finishes.
          </li>
        </ul>
        <h2>Cane Furniture</h2>
        <ul>
          <li>
            <strong>Stable Environment</strong>: Keep cane pieces away from
            direct sun, drafty air vents or heaters. Cane is a natural woven
            fiber that thrives in moderate indoor humidity. Too much heat or
            dryness will make the strands brittle and prone to breakage, while
            prolonged dampness can cause sagging or mold.
          </li>
          <li>
            <strong>Maintain Moisture</strong>: To keep cane flexible, maintain
            indoor humidity around 40–60%. In dry seasons use a humidifier; in
            typical conditions lightly mist cane furniture with diluted wood
            soap (e.g. Murphy{"’"}s Oil Soap diluted in water) a few times a
            year, then wipe off excess. You may also apply a thin coat of
            natural oil (like lemon or mineral oil) on the cane every 6–12
            months to nourish the fibers.
          </li>
          <li>
            <strong>Gentle Cleaning</strong>: Dust cane regularly with a soft
            brush or vacuum attachment. For deeper cleaning, wipe with a soft
            cloth or brush dipped in warm water with mild detergent. Be careful
            not to soak the cane – rinse any soap residue and let the piece dry
            fully (preferably in a warm, breezy room) to prevent mildew. If
            spots of mold appear, lightly clean with a diluted bleach or
            hydrogen-peroxide solution on a cotton swab, then rinse and dry
            quickly.
          </li>
          <li>
            <strong>Distribute Weight Evenly</strong>: Cane seats are meant for
            distributed weight. Never kneel, stand, or place heavy objects on a
            cane surface. Concentrated pressure will break the weave. For added
            protection, use a chair pad or cushion which spreads weight across
            the seat. If a cane seat does sag slightly, it can often be
            tightened by gently wetting and drying (this should be done
            carefully or by a professional).
          </li>
          <li>
            <strong>Avoid Water Damage</strong>: Do not let cane furniture sit
            in water or very damp areas. In monsoon or if cane gets wet, dry it
            promptly in warm air. Keep cane items indoors or under cover during
            heavy rains to prevent swelling or mildew. Good air circulation
            around cane pieces is essential; avoid pushing them tightly against
            outside walls or storing in dark, damp cellars.
          </li>
          <li>
            <strong>What to Avoid</strong>:Avoid harsh chemical cleaners and
            excessive water. Don{"’"}t use silicone sprays or varnish on cane
            (it needs to “breathe”). And like wood furniture, always lift cane
            items when moving them rather than dragging.
          </li>
        </ul>
        <h2>Upholstery & Fabric Seating</h2>
        <ul>
          <li>
            <strong>Regular Cleaning</strong>: Vacuum fabric surfaces weekly
            using a soft-brush upholstery attachment to remove dust, crumbs, and
            pet hair. A quick lint-roller pass will help keep fabrics looking
            fresh. Clean under removable cushions and in crevices too.
          </li>
          <li>
            <strong>Immediate Spill Care</strong>: Treat spills and stains as
            soon as they happen. Blot (don{"’"}t rub) with a clean white cloth
            or paper towel to absorb liquid. For most fabrics, gently dab the
            spot with a slightly damp cloth and mild dish soap solution, then
            blot dry. Always test cleaners on an inconspicuous area first. For
            solvent-safe textiles (like rayon or wool), use a recommended
            dry-clean solvent instead of water. After cleaning, allow the fabric
            to air-dry completely; avoid reusing pillows/covers until fully dry.
          </li>
          <li>
            <strong>Upholstery Care</strong>: Rotate and flip loose seat
            cushions every month to distribute wear evenly. Vacuum or brush
            fabric to remove embedded dust. If covers are removable, launder or
            dry-clean them per the tag instructions. Plan a professional steam
            or deep clean about once a year (or twice for very heavy use) to
            refresh the fabric.
          </li>
          <li>
            <strong>Sun & Heat Protection</strong>: Position sofas and chairs
            away from direct sunlight. UV rays will fade fabrics and can weaken
            fibers over time. Likewise, keep upholstered pieces clear of heat
            vents or radiators. If you must place furniture near a window,
            consider UV-blocking window treatments or rotate the piece
            occasionally to even out any fading.
          </li>
          <li>
            <strong>Everyday Precautions</strong>: Use coasters or trays when
            eating on upholstered furniture. Placing a washable throw or
            slipcover can guard against spills and pet accidents. Teach guests
            (and children) to avoid eating on sofas, or set plates on a tray.
            Keep sharp objects (pens, keys, hardware) away from fabric to
            prevent snags. For leather or suede upholstery, follow specific
            conditioner routines and avoid water altogether.
          </li>
          <li>
            <strong>Seasonal Tips</strong>: In humid weather, run a dehumidifier
            or ensure air conditioning is used so fabrics stay dry (mold can
            form in damp, stagnant air). After the monsoon, make sure any
            damp-cleaned fabrics are fully dried (open windows or use fans). In
            winter dryness, a bit of indoor humidity (around 40%) will help
            prevent static cling and keep fibers from becoming brittle.
          </li>
          <li>
            <strong>What to Avoid</strong>: Never drag upholstered furniture
            across floors. Don{"’"}t soak fabric with cleaner – more damage
            comes from over wetting than gentle scrubbing. Avoid bleach or
            strong solvents unless the fabric explicitly permits it. And always
            check the manufacturer{"’"}s care tag/code before applying any
            cleaning solution (when in doubt, consult a professional cleaner).
          </li>
        </ul>
      </>
    ),
  },

  CancellationRefund: {
    pagetitle: "Cancellation & Refund Policy",
    content: (
      <>
        <h2>Cancellation & Refund Policy</h2>
        <p>
          Please review the following policies carefully so you know what to
          expect if you need to cancel an order or report an issue with your
          delivery.
        </p>
        <h2>Order Cancellations</h2>
        <p>
          You may cancel your order <strong>within 24 hours</strong> of placing
          it. This 24-hour window allows us to adjust production and fulfillment
          before work begins. To cancel, simply contact our customer service
          team with your order number. Please note that after 24 hours,
          cancellations are no longer accepted, as orders move quickly into
          processing or production. If you cancel in time and a payment has
          already been processed, we will convert the amount into store credit
          (see <strong>Store Credit Policy</strong> below), since we do not
          issue refunds in any case.
        </p>
        <h2>Return Eligibility</h2>
        <p>
          Urbanfry Homes does <strong>not</strong> accept returns for change of
          mind, design choice, or other reasons unrelated to product issues. All
          sales are final except in the limited cases described below. The only
          items eligible for return or exchange are those that arrive{" "}
          <strong>damaged, defective, or incorrect</strong>. We ask that you
          inspect your items upon delivery. If an item is not as ordered or has
          a manufacturing fault or shipping damage, it qualifies for resolution
          under our damaged/defective policy. No other returns or refunds are
          permitted.
        </p>
        <h2>Damaged or Defective Products</h2>
        <p>
          If your order arrives with damage, defects, or you received the wrong
          item, we are here to make it right. Please report the issue within{" "}
          <strong>48 hours of delivery</strong> (see below for how to do this).
          We will arrange and cover return shipping for the affected item at no
          cost to you. Depending on availability, we will then:
        </p>
        <ul>
          <li>
            <strong>Replace the item</strong>: If the same item is in stock, we
            will ship you a new one promptly
          </li>
          <li>
            <strong>Issue store credit</strong>: If we cannot provide a
            replacement (for example, the item is out of stock) or if you
            prefer, we will grant you store credit for the full item price.
          </li>
        </ul>
        <p>
          Either way, we will handle the process quickly and make sure you{"’"}
          re not left empty-handed. (Again, note that we do not provide cash
          refunds; we resolve issues with replacements or credit.)
        </p>
        <h2>Made-to-Order Products</h2>
        <p>
          Custom or made-to-order items are created just for you, so please
          choose carefully. Once production on a custom piece has begun,{" "}
          <strong>we cannot cancel or return</strong> that order. These items
          are final sale once they are in production. The only exception is if a
          made-to-order item arrives with confirmed transit damage or a
          manufacturing defect. In that case, please follow our
          damaged/defective process: we will arrange return shipping and then
          repair, replace, or issue store credit for the item as described
          above.
        </p>
        <h2>Store Credit Policy</h2>
        <p>
          Urbanfry Homes does not issue cash refunds under any circumstances. If
          a refund would normally apply, we instead provide store credit. Store
          credit is equal to the full purchase price of the item (excluding any
          shipping fees) and will be issued to your Urbanfry Homes account. It
          has no expiration date and can be used toward any future purchase with
          us. Store credit cannot be redeemed for cash and is non-transferable.
          You can apply the credit at checkout just like a gift card.
        </p>
        <h2>How to Report a Return</h2>
        <p>
          To report a damaged, defective, or incorrect item, please act promptly
          (within 48 hours of delivery). Here{"’"}s how:
        </p>
        <ol>
          <li>
            <strong>1. Contact Us Quickly</strong>: Reach out to our customer
            service team right away with your order number and a brief
            description of the issue. Timely notice helps us resolve things
            faster.
          </li>
          <li>
            <strong>2. Provide Photos</strong>: Take clear photos of the problem
            — include the packaging and the item so we can see the damage or
            defect. Attach these photos to your message or upload them as
            directed.
          </li>
          <li>
            <strong>3. Follow Our Guidance</strong>: After you{"’"}ve submitted
            your report, our team will review the information and get back to
            you. We{"’"}ll give you a return shipping label or arrange pick-up
            (at our expense), and let you know whether a replacement or store
            credit will be issued.
          </li>
        </ol>
        <p>
          We value your satisfaction and will work quickly to make things right
          when errors occur. Thank you for choosing Urbanfry Homes; we
          appreciate your trust in our quality and service.
        </p>
      </>
    ),
  },
};

export default Pagesdata;
