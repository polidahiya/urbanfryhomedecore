import React from "react";
import Standardinputfield from "@/app/admin/products/_comps/_comps/Standardinputfield";
import Dropdownmenu from "@/app/admin/products/_comps/_comps/Dropdownmenu";
import { indianStatesAndUTs } from "@/app/(main)/Checkout/_comps/Addressbar";
import Togglebuttons from "@/app/admin/products/_comps/_comps/Togglebuttons";
import Formparts from "./Formparts";

function Shippingdetailscomp({ data, setdata }) {
  return (
    <Formparts heading="Shipping Details">
      <Standardinputfield
        titlename="Full Name"
        value={data.shippingdetails.fullName}
        type="text"
        onchange={(e) =>
          setdata((pre) => ({
            ...pre,
            shippingdetails: {
              ...pre.shippingdetails,
              fullName: e.target.value,
            },
          }))
        }
        clear={() => {
          setdata((pre) => ({
            ...pre,
            shippingdetails: { ...pre.shippingdetails, fullName: "" },
          }));
        }}
      />
      <Standardinputfield
        titlename="Email address"
        value={data.shippingdetails.email}
        type="email"
        onchange={(e) =>
          setdata((pre) => ({
            ...pre,
            shippingdetails: {
              ...pre.shippingdetails,
              email: e.target.value,
            },
          }))
        }
        clear={() => {
          setdata((pre) => ({
            ...pre,
            shippingdetails: { ...pre.shippingdetails, email: "" },
          }));
        }}
      />
      <Standardinputfield
        titlename="Mobile Number"
        value={data.shippingdetails.mobile}
        type="tel"
        onchange={(e) =>
          setdata((pre) => ({
            ...pre,
            shippingdetails: {
              ...pre.shippingdetails,
              mobile: e.target.value,
            },
          }))
        }
        clear={() => {
          setdata((pre) => ({
            ...pre,
            shippingdetails: { ...pre.shippingdetails, mobile: "" },
          }));
        }}
      />
      {/*  */}
      <Formparts heading="Shipping Address">
        <Standardinputfield
          titlename="Address1"
          value={data.shippingdetails.shipping.address1}
          type="text"
          onchange={(e) =>
            setdata((pre) => ({
              ...pre,
              shippingdetails: {
                ...pre.shippingdetails,
                shipping: {
                  ...pre.shippingdetails.shipping,
                  address1: e.target.value,
                },
              },
            }))
          }
          clear={() => {
            setdata((pre) => ({
              ...pre,
              shippingdetails: {
                ...pre.shippingdetails,
                shipping: {
                  ...pre.shippingdetails.shipping,
                  address1: "",
                },
              },
            }));
          }}
        />
        <Standardinputfield
          titlename="Address2"
          value={data.shippingdetails.shipping.address2}
          isRequired={false}
          type="text"
          onchange={(e) =>
            setdata((pre) => ({
              ...pre,
              shippingdetails: {
                ...pre.shippingdetails,
                shipping: {
                  ...pre.shippingdetails.shipping,
                  address2: e.target.value,
                },
              },
            }))
          }
          clear={() => {
            setdata((pre) => ({
              ...pre,
              shippingdetails: {
                ...pre.shippingdetails,
                shipping: {
                  ...pre.shippingdetails.shipping,
                  address2: "",
                },
              },
            }));
          }}
        />
        <Standardinputfield
          titlename="City"
          value={data.shippingdetails.shipping.city}
          type="text"
          onchange={(e) =>
            setdata((pre) => ({
              ...pre,
              shippingdetails: {
                ...pre.shippingdetails,
                shipping: {
                  ...pre.shippingdetails.shipping,
                  city: e.target.value,
                },
              },
            }))
          }
          clear={() => {
            setdata((pre) => ({
              ...pre,
              shippingdetails: {
                ...pre.shippingdetails,
                shipping: {
                  ...pre.shippingdetails.shipping,
                  city: "",
                },
              },
            }));
          }}
        />
        <Dropdownmenu
          title="State"
          state={data.shippingdetails.shipping.state}
          onchange={(value) => {
            setdata((pre) => ({
              ...pre,
              shippingdetails: {
                ...pre.shippingdetails,
                shipping: {
                  ...pre.shippingdetails.shipping,
                  state: value,
                },
              },
            }));
          }}
          options={indianStatesAndUTs}
        />
      </Formparts>
      <Togglebuttons
        titlename="Billing Address same as Shipping Address"
        value={data.shippingdetails.billingSame}
        positive={() => {
          setdata((pre) => ({
            ...pre,
            shippingdetails: {
              ...pre.shippingdetails,
              billingSame: true,
            },
          }));
        }}
        negative={() => {
          setdata((pre) => ({
            ...pre,
            shippingdetails: {
              ...pre.shippingdetails,
              billingSame: false,
            },
          }));
        }}
        positiveText={"Yes"}
        negativeText={"No"}
      />
      {!data.shippingdetails.billingSame && (
        <Formparts heading="Billing Address">
          <Standardinputfield
            titlename="Address1"
            value={data.shippingdetails.billing.address1}
            type="text"
            onchange={(e) =>
              setdata((pre) => ({
                ...pre,
                shippingdetails: {
                  ...pre.shippingdetails,
                  billing: {
                    ...pre.shippingdetails.billing,
                    address1: e.target.value,
                  },
                },
              }))
            }
            clear={() => {
              setdata((pre) => ({
                ...pre,
                shippingdetails: {
                  ...pre.shippingdetails,
                  billing: {
                    ...pre.shippingdetails.billing,
                    address1: "",
                  },
                },
              }));
            }}
          />
          <Standardinputfield
            titlename="Address2"
            value={data.shippingdetails.billing.address2}
            isRequired={false}
            type="text"
            onchange={(e) =>
              setdata((pre) => ({
                ...pre,
                shippingdetails: {
                  ...pre.shippingdetails,
                  billing: {
                    ...pre.shippingdetails.billing,
                    address2: e.target.value,
                  },
                },
              }))
            }
            clear={() => {
              setdata((pre) => ({
                ...pre,
                shippingdetails: {
                  ...pre.shippingdetails,
                  billing: {
                    ...pre.shippingdetails.billing,
                    address2: "",
                  },
                },
              }));
            }}
          />
          <Standardinputfield
            titlename="City"
            value={data.shippingdetails.billing.city}
            type="text"
            onchange={(e) =>
              setdata((pre) => ({
                ...pre,
                shippingdetails: {
                  ...pre.shippingdetails,
                  billing: {
                    ...pre.shippingdetails.shipping,
                    city: e.target.value,
                  },
                },
              }))
            }
            clear={() => {
              setdata((pre) => ({
                ...pre,
                shippingdetails: {
                  ...pre.shippingdetails,
                  billing: {
                    ...pre.shippingdetails.shipping,
                    city: "",
                  },
                },
              }));
            }}
          />
          <Dropdownmenu
            title="State"
            state={data.shippingdetails.billing.state}
            onchange={(value) => {
              setdata((pre) => ({
                ...pre,
                shippingdetails: {
                  ...pre.shippingdetails,
                  billing: {
                    ...pre.shippingdetails.shipping,
                    state: value,
                  },
                },
              }));
            }}
            options={indianStatesAndUTs}
          />
        </Formparts>
      )}

      {/*  */}
      <Standardinputfield
        titlename="User Order Note"
        value={data.shippingdetails.orderNotes}
        isRequired={false}
        type="text"
        onchange={(e) =>
          setdata((pre) => ({
            ...pre,
            shippingdetails: {
              ...pre.shippingdetails,
              orderNotes: e.target.value,
            },
          }))
        }
        clear={() => {
          setdata((pre) => ({
            ...pre,
            shippingdetails: { ...pre.shippingdetails, orderNotes: "" },
          }));
        }}
      />
    </Formparts>
  );
}

export default Shippingdetailscomp;
