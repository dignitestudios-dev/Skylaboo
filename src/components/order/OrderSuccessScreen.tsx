import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { OrderData } from "@/lib/types";
import { utils } from "@/lib/utils";
import toast from "react-hot-toast";
import Image from "next/image";
import { Clock, Printer } from "lucide-react";

(pdfMake as any).vfs = pdfFonts.vfs;

// Success Screen Component
const OrderSuccessScreen = ({ orderData }: { orderData: OrderData | null }) => {
  if (!orderData) return <p>No Order Found</p>;

  const generatePDF = (orderData: OrderData) => {
    const docDefinition: any = {
      content: [
        {
          text: "Skylaboo Order Receipt!",
          style: "header",
        },
        {
          text: `Order #${orderData.shortCode}`,
          style: "subheader",
        },
        { text: "\n" },

        {
          columns: [
            [
              { text: "Contact Information", style: "sectionHeader" },
              { text: `Email: ${orderData.contact.email}` },
              orderData.delivery?.firstName
                ? { text: `Name: ${orderData.delivery.firstName}` }
                : {},
              orderData.delivery?.phoneNumber
                ? { text: `Phone: ${orderData.delivery.phoneNumber}` }
                : {},
            ],
            [
              {
                text:
                  orderData.orderType === "delivery"
                    ? "Delivery Details"
                    : "Pickup Details",
                style: "sectionHeader",
              },
              { text: `Order Type: ${orderData.orderType}` },
              orderData.delivery
                ? [
                    { text: `Address: ${orderData.delivery.address}` },
                    orderData.delivery.apartment
                      ? { text: `Apartment: ${orderData.delivery.apartment}` }
                      : {},
                    { text: `City: ${orderData.delivery.city}` },
                    orderData.delivery.postalCode
                      ? {
                          text: `Postal Code: ${orderData.delivery.postalCode}`,
                        }
                      : {},
                  ]
                : [{ text: `Pickup Address: 742 Evergreen Terrace` }],
              {
                text: `Order Date: ${new Date(
                  orderData.createdAt
                ).toDateString()}`,
              },
            ],
          ],
        },

        { text: "\n\n" },

        {
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto", "auto", "auto", "auto"],
            body: [
              [
                { text: "Product", style: "tableHeader" },
                { text: "Color", style: "tableHeader" },
                { text: "Size", style: "tableHeader" },
                { text: "Price", style: "tableHeader" },
                { text: "Qty", style: "tableHeader" },
                { text: "Total", style: "tableHeader" },
              ],
              ...orderData.products.map((p) => [
                p.product.title,
                p.selectedColor,
                p.selectedSize,
                `$${p.product.price.toFixed(2)}`,
                `${p.quantity}`,
                `$${(p.quantity * p.product.price).toFixed(2)}`,
              ]),
            ],
          },
          layout: "lightHorizontalLines",
        },

        { text: "\n" },

        {
          columns: [
            { text: "" },
            {
              width: "auto",
              table: {
                body: [
                  [
                    "Subtotal",
                    `$${(
                      orderData.totalAmount - orderData.shippingCost
                    ).toFixed(2)}`,
                  ],
                  ["Shipping", `$${orderData.shippingCost.toFixed(2)}`],
                  [
                    { text: "Total", bold: true },
                    {
                      text: `$${orderData.totalAmount.toFixed(2)}`,
                      bold: true,
                    },
                  ],
                ],
              },
              layout: "noBorders",
            },
          ],
        },

        { text: "\n\n" },

        {
          text: "Thank you for your business! If you have any questions about your order, please contact us.",
          style: "footer",
        },
        { text: "+1234567890 | contact@skylaboo.com", style: "footer" },
        {
          text: "This is an electronic receipt. Please save this for your records.",
          style: "footerNote",
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
          color: "#ff82e9",
        },
        subheader: { fontSize: 16, alignment: "center", margin: [0, 0, 0, 20] },
        sectionHeader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
          color: "#ff82e9",
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          fillColor: "#ff82e9",
          color: "white",
        },
        footer: {
          alignment: "center",
          margin: [0, 10, 0, 0],
          color: "#ff82e9",
        },
        footerNote: { alignment: "center", fontSize: 9, margin: [0, 5, 0, 0] },
      },
      defaultStyle: {
        fontSize: 10,
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`Order_${orderData.shortCode}.pdf`);
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderData.shortCode);
    toast.success("Order ID copied!");
  };

  return (
    <section className="flex flex-col justify-center items-center gap-3 sm:mt-12 sm:p-12 p-6">
      <Image
        src={"/images/welcome.png"}
        alt="Welcome"
        width={120}
        height={120}
      />

      <h2 className="font-sans-bold text-4xl text-[var(--color-purple)]">
        Thank you for Shopping!
      </h2>

      <p className="text-[#505050] text-center">
        Your order ID: #{orderData.shortCode} has been placed successfully
      </p>

      <p className="font-medium text-lg text-center">
        A confirmation email containing order summary has been sent to your{" "}
        <br />
        provided email address {orderData.contact.email}
      </p>

      <div className="mt-5 flex items-center gap-10">
        <div className="flex items-center gap-2">
          <Clock color="#808080" size={18} />
          Order Placed:{" "}
          <span className="text-[#808080]">
            {" "}
            {utils.formatDateWithMonthName(orderData.createdAt)}
          </span>
        </div>

        <div>
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => generatePDF(orderData)}
          >
            <Printer color="#808080" size={18} />
            <span className="underline">Print</span>
          </button>
        </div>
      </div>

      <div className="bg-multi-gradient p-0.5 w-full rounded-2xl mt-10">
        <div className="w-full min-h-56 grid grid-cols-3 bg-white rounded-2xl">
          <div className="h-full p-5 bg-gradient-order-success">Contact</div>
          <div className="h-full p-5 bg-white">Shipping</div>
          <div className="h-full p-5 bg-gradient-order-success">Payment</div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccessScreen;

// <div className="relative mt-20 min-h-screen">
//   {/* Background decorative elements */}
//   <div className="absolute inset-0 overflow-hidden">
//     <div className="absolute top-20 left-10 w-32 h-32 bg-[var(--color-purple)]/30 rounded-full opacity-20"></div>
//     <div className="absolute top-40 right-20 w-24 h-24 bg-[var(--color-yellow)]/30 rounded-full opacity-20 delay-300"></div>
//   </div>

//   <div className="relative z-10 container mx-auto px-4 py-16">
//     {/* Success Header */}
//     <div className="text-center mb-12">
//       <div className="inline-flex items-center justify-center w-24 h-24 bg-multi-gradient rounded-full mb-6 animate-bounce">
//         <svg
//           className="w-12 h-12 text-white"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="3"
//             d="M5 13l4 4L19 7"
//           ></path>
//         </svg>
//       </div>
//       <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#ff82e9] to-[#ebc501] bg-clip-text text-transparent pb-4">
//         Thank you for Shopping!
//       </h1>
//       <p className="text-xl text-gray-600 mb-2">
//         Your order has been placed successfully
//       </p>
//     </div>

//     {/* Order ID Section */}
//     <div className="text-center mb-8">
//       <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg">
//         <span className="text-gray-600">Your order ID:</span>
//         <span className="font-bold text-[var(--color-purple)] text-lg">
//           #{orderData.shortCode}
//         </span>
//         <button
//           onClick={handleCopyOrderId}
//           className="p-1 hover:bg-gray-100 rounded cursor-pointer"
//         >
//           <Copy />
//         </button>
//       </div>
//     </div>

//     {/* Main Content */}
//     <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
//       {/* Header Actions */}
//       <div className="bg-multi-gradient px-8 py-6">
//         <div className="flex justify-between items-center text-white">
//           <div>
//             <h2 className="text-2xl font-bold">Order Summary</h2>
//             <p className="opacity-90">
//               Order placed on{" "}
//               {utils.formatDateWithMonthName(orderData.createdAt)}
//             </p>
//           </div>
//           <button
//             onClick={() => generatePDF(orderData)}
//             className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors cursor-pointer"
//           >
//             <Download size={18} />
//             Download PDF
//           </button>
//         </div>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8 p-8">
//         {/* Order Details */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Customer Information */}
//           <div className="bg-gray-50 rounded-2xl p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <User className="text-[var(--color-purple)]" size={20} />
//               Contact Information
//             </h3>
//             <div className="space-y-2">
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Mail size={16} />
//                 <span>{orderData.contact.email}</span>
//               </div>
//               {orderData?.delivery?.firstName && (
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <User size={16} />
//                   <span>{orderData?.delivery?.firstName}</span>
//                 </div>
//               )}
//               {orderData.delivery?.phoneNumber && (
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Phone size={16} />
//                   <span>{orderData.delivery?.phoneNumber}</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Delivery Information */}
//           <div className="bg-gray-50 rounded-2xl p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <MapPin className="text-[var(--color-purple)]" size={20} />
//               {orderData.orderType === "delivery"
//                 ? "Delivery Details"
//                 : "Pickup Details"}
//             </h3>
//             {orderData.orderType === "delivery" && orderData.delivery ? (
//               <div className="space-y-2 text-gray-600">
//                 <p>
//                   <strong>Address:</strong> {orderData.delivery.address}
//                 </p>
//                 {orderData.delivery.apartment && (
//                   <p>
//                     <strong>Apartment:</strong>{" "}
//                     {orderData.delivery.apartment}
//                   </p>
//                 )}
//                 <p>
//                   <strong>City:</strong> {orderData.delivery.city}
//                 </p>
//                 {orderData.delivery.postalCode && (
//                   <p>
//                     <strong>Postal Code:</strong>{" "}
//                     {orderData.delivery.postalCode}
//                   </p>
//                 )}
//               </div>
//             ) : (
//               <div className="space-y-2 text-gray-600">
//                 <p>
//                   <strong>Pickup Address:</strong>{" "}
//                   {orderData.pickupAddress}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Product List */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-bold text-gray-800">
//               Order Items
//             </h3>
//             {orderData.products.map((product, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center"
//               >
//                 <div className="flex-1">
//                   <h4 className="font-semibold text-gray-800">
//                     {product.product.title}
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     Color: {product.selectedColor} | Size:{" "}
//                     {product.selectedSize} | Qty: {product.quantity}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold">
//                     $
//                     {(product.product.price * product.quantity).toFixed(
//                       2
//                     )}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     ${product.product?.price?.toFixed(2)} each
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="space-y-6">
//           <div className="bg-gradient-to-br from-[var(--color-purple)]/10 to-[var(--color-purple)]/10 rounded-2xl p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-6">
//               Order Summary
//             </h3>

//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">
//                   Subtotal ({orderData.products?.length} items)
//                 </span>
//                 <span className="font-semibold">
//                   $
//                   {(
//                     orderData?.totalAmount - orderData.shippingCost
//                   ).toFixed(2)}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Shipping</span>
//                 <span className="font-semibold">
//                   ${orderData?.shippingCost.toFixed(2)}
//                 </span>
//               </div>

//               <div className="border-t pt-4">
//                 <div className="flex justify-between items-center text-xl font-bold text-[var(--color-purple)]">
//                   <span>Total</span>
//                   <span>${orderData?.totalAmount.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="text-center space-y-4">
//             <Link
//               href="/"
//               className="block w-full bg-multi-gradient text-white py-4 rounded-2xl font-semibold"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
