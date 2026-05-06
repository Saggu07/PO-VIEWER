// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // // Format date 
// // const formatDate = (dateString) => {
// //   const date = new Date(dateString);
// //   const day = date.getDate();
// //   const month = date.toLocaleString('default', { month: 'long' });
// //   const year = date.getFullYear();
  
// //   // Add ordinal suffix to day
// //   const getOrdinalSuffix = (day) => {
// //     if (day > 3 && day < 21) return 'th';
// //     switch (day % 10) {
// //       case 1: return 'st';
// //       case 2: return 'nd';
// //       case 3: return 'rd';
// //       default: return 'th';
// //     }
// //   };
  
// //   return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
// // };
// // // ============== COMPONENTS ==============

// // // Loading Component
// // const LoadingSpinner = () => (
// //   <div style={styles.loadingContainer}>
// //     <div style={styles.spinner}></div>
// //     <h2>Loading PO Details...</h2>
// //   </div>
// // );

// // // Error Component
// // const ErrorMessage = ({ message }) => (
// //   <div style={styles.errorContainer}>
// //     <h3>⚠️ Error Loading Data</h3>
// //     <p>{message}</p>
// //   </div>
// // );

// // // PDF Viewer Component
// // const PDFViewer = ({ pdfUrl }) => (
// //   <div style={styles.pdfContainer}>
// //     <div style={styles.pdfHeader}>
// //       <h3>📄 Purchase Order Document</h3>
// //     </div>
// //     <div style={styles.pdfWrapper}>
// //       <iframe 
// //         src={pdfUrl} 
// //         style={styles.pdfIframe}
// //         title="PO Document"
// //       />
// //     </div>
// //   </div>
// // );

// // // PO Header Component
// // const POHeader = ({ data }) => (
// //   <div style={styles.card}>
// //     <h2 style={styles.sectionTitle}>📋 Purchase Order Details</h2>
// //     <div style={styles.infoGrid}>
// //       <div style={styles.infoItem}>
// //         <span style={styles.label}>PO Number:</span>
// //         <span style={styles.value}>{data.buyer_po_number}</span>
// //       </div>
// //        <div style={styles.infoItem}>
// //         <span style={styles.label}>Order Date:</span>
// //         <span style={styles.value}>{formatDate(data.order_date)}</span>
// //       </div>
// //       <div style={styles.infoItem}>
// //         <span style={styles.label}>Currency:</span>
// //         <span style={styles.value}>{data.currency}</span>
// //       </div>
// //       <div style={styles.infoItem}>
// //         <span style={styles.label}>Total Value:</span>
// //         <span style={styles.valueHighlight}>{data.currency} {parseFloat(data.value_of_goods).toLocaleString()}</span>
// //       </div>
// //     </div>
// //   </div>
// // );

// // // Buyer Info Component
// // const BuyerInfo = ({ data }) => (
// //   <div style={styles.card}>
// //     <h3 style={styles.subtitle}>🏢 Buyer Information</h3>
// //     <div style={styles.contactInfo}>
// //       <p><strong>Company:</strong> {data.buyer_company}</p>
// //       <p><strong>Contact:</strong> {data.buyer_contact}</p>
// //       <p><strong>Email:</strong> <a href={`mailto:${data.buyer_email}`} style={styles.link}>{data.buyer_email}</a></p>
// //     </div>
// //   </div>
// // );

// // // Vendor Info Component
// // const VendorInfo = ({ data }) => (
// //   <div style={styles.card}>
// //     <h3 style={styles.subtitle}>🏭 Vendor Information</h3>
// //     <div style={styles.contactInfo}>
// //       <p><strong>Company:</strong> {data.vendor_company}</p>
// //       <p><strong>Address:</strong> {data.vendor_address}</p>
// //     </div>
// //   </div>
// // );

// // // Line Items Table Component with Discount column and Total
// // const LineItemsTable = ({ items, currency }) => {
// //   // Calculate total of all line items
// //   const calculateTotal = () => {
// //     return items.reduce((sum, item) => sum + (parseFloat(item.line_total) || 0), 0);
// //   };

// //   const grandTotal = calculateTotal();

// //   return (
// //     <div style={styles.card}>
// //       <h3 style={styles.subtitle}>📦 Line Items</h3>
// //       <div style={styles.tableContainer}>
// //         <table style={styles.table}>
// //           <thead>
// //             <tr style={styles.tableHeader}>
// //               <th style={styles.th}>SKU</th>
// //               <th style={styles.th}>Description</th>
// //               <th style={styles.th}>Qty</th>
// //               <th style={styles.th}>Unit Price</th>
// //               <th style={styles.th}>Discount (%)</th>
// //               <th style={styles.th}>Line Total</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {items.map((item, index) => (
// //               <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
// //                 <td style={styles.td}>{item.vendor_sku}</td>
// //                 <td style={styles.td}>{item.description}</td>
// //                 <td style={styles.tdCentered}>{parseInt(item.qty).toLocaleString()}</td>
// //                 <td style={styles.tdRight}>{parseFloat(item.unit_price).toLocaleString()}</td>
// //                 <td style={styles.tdRight}>{item.discount_percent || '0'}</td>
// //                 <td style={styles.tdRightHighlight}>{parseFloat(item.line_total).toLocaleString()}</td>
// //               </tr>
// //             ))}
// //             {/* Total Row */}
// //             <tr style={styles.totalRow}>
// //               <td colSpan="5" style={styles.totalLabel}>Total Value of All Line Items:</td>
// //               <td style={styles.totalValue}>{currency} {grandTotal.toLocaleString()}</td>
// //             </tr>
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // // Right Panel Component
// // const RightPanel = ({ data }) => (
// //   <div style={styles.rightPanel}>
// //     <POHeader data={data} />
// //     <BuyerInfo data={data} />
// //     <VendorInfo data={data} />
// //     <LineItemsTable items={data.items} currency={data.currency} />
// //   </div>
// // );

// // // Main Layout Component
// // const MainLayout = ({ data }) => (
// //   <div style={styles.mainContainer}>
// //     <PDFViewer pdfUrl={data.pdfUrl} />
// //     <RightPanel data={data} />
// //   </div>
// // );

// // // ============== MAIN COMPONENT ==============

// // export default function PoViewer() {
// //   const [data, setData] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchPOData = async () => {
// //       try {
// //         setLoading(true);
// //         const params = new URLSearchParams(window.location.search);
// //         const id = params.get("id");

// //         if (!id) {
// //           setError("No PO ID provided in URL");
// //           setLoading(false);
// //           return;
// //         }

// //         const response = await axios.get(`http://localhost:5000/api/po/${id}`);
// //         setData(response.data);
// //         setError(null);
// //       } catch (err) {
// //         console.error("Error fetching PO data:", err);
// //         setError(err.response?.data?.message || err.message || "Failed to load PO data");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPOData();
// //   }, []);

// //   if (loading) return <LoadingSpinner />;
// //   if (error) return <ErrorMessage message={error} />;
// //   if (!data) return <ErrorMessage message="No data available" />;

// //   return <MainLayout data={data} />;
// // }


// // // ============== STYLES ==============

// // const styles = {
// //   // Layout Styles - Full height alignment
// //   mainContainer: {
// //     display: "flex",
// //     height: "100vh",
// //     backgroundColor: "#f5f5f5",
// //     overflow: "hidden",
// //   },
  
// //   pdfContainer: {
// //     flex: "1",
// //     width: "50%",
// //     backgroundColor: "#fff",
// //     boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
// //     display: "flex",
// //     flexDirection: "column",
// //     height: "100vh",
// //   },
  
// //   pdfHeader: {
// //     padding: "12px 16px",
// //     backgroundColor: "#2c3e50",
// //     color: "white",
// //     borderBottom: "2px solid #3498db",
// //     fontSize: "14px",
// //     flexShrink: 0,
// //   },
  
// //   pdfWrapper: {
// //     flex: 1,
// //     overflow: "auto",
// //     position: "relative",
// //   },
  
// //   pdfIframe: {
// //     width: "100%",
// //     height: "100%",
// //     border: "none",
// //   },
  
// //   rightPanel: {
// //     flex: "1",
// //     width: "50%",
// //     padding: "16px",
// //     overflowY: "auto",
// //     height: "100vh",
// //     backgroundColor: "#f5f5f5",
// //   },
  
// //   card: {
// //     backgroundColor: "white",
// //     borderRadius: "6px",
// //     padding: "14px 16px",
// //     marginBottom: "16px",
// //     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //   },
  
// //   sectionTitle: {
// //     margin: "0 0 12px 0",
// //     color: "#2c3e50",
// //     fontSize: "16px",
// //     borderBottom: "2px solid #3498db",
// //     paddingBottom: "6px",
// //   },
  
// //   subtitle: {
// //     margin: "0 0 10px 0",
// //     color: "#34495e",
// //     fontSize: "15px",
// //   },
  
// //   infoGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
// //     gap: "10px",
// //   },
  
// //   infoItem: {
// //     display: "flex",
// //     flexDirection: "column",
// //   },
  
// //   label: {
// //     fontSize: "10px",
// //     color: "#7f8c8d",
// //     textTransform: "uppercase",
// //     fontWeight: "bold",
// //     marginBottom: "3px",
// //   },
  
// //   value: {
// //     fontSize: "13px",
// //     color: "#2c3e50",
// //     fontWeight: "500",
// //   },
  
// //   valueHighlight: {
// //     fontSize: "15px",
// //     color: "#e74c3c",
// //     fontWeight: "bold",
// //   },
  
// //   contactInfo: {
// //     lineHeight: "1.4",
// //     fontSize: "13px",
// //   },
  
// //   link: {
// //     color: "#3498db",
// //     textDecoration: "none",
// //   },
  
// //   tableContainer: {
// //     overflowX: "auto",
// //   },
  
// //   table: {
// //     width: "100%",
// //     borderCollapse: "collapse",
// //     fontSize: "12px",
// //   },
  
// //   tableHeader: {
// //     backgroundColor: "#34495e",
// //     color: "white",
// //   },
  
// //   th: {
// //     padding: "8px 10px",
// //     textAlign: "left",
// //     fontWeight: "bold",
// //     borderBottom: "2px solid #2c3e50",
// //     fontSize: "11px",
// //   },
  
// //   td: {
// //     padding: "6px 10px",
// //     borderBottom: "1px solid #ecf0f1",
// //     fontSize: "12px",
// //   },
  
// //   tdCentered: {
// //     padding: "6px 10px",
// //     textAlign: "center",
// //     borderBottom: "1px solid #ecf0f1",
// //     fontSize: "12px",
// //   },
  
// //   tdRight: {
// //     padding: "6px 10px",
// //     textAlign: "right",
// //     borderBottom: "1px solid #ecf0f1",
// //     fontSize: "12px",
// //   },
  
// //   tdRightHighlight: {
// //     padding: "6px 10px",
// //     textAlign: "right",
// //     fontWeight: "bold",
// //     color: "#e74c3c",
// //     borderBottom: "1px solid #ecf0f1",
// //     fontSize: "12px",
// //   },
  
// //   tableRowEven: {
// //     backgroundColor: "#fff",
// //   },
  
// //   tableRowOdd: {
// //     backgroundColor: "#f9f9f9",
// //   },
  
// //   // New styles for total row
// //   totalRow: {
// //     backgroundColor: "#f0f0f0",
// //     fontWeight: "bold",
// //     borderTop: "2px solid #3498db",
// //   },
  
// //   totalLabel: {
// //     padding: "8px 10px",
// //     textAlign: "right",
// //     fontWeight: "bold",
// //     fontSize: "13px",
// //     color: "#2c3e50",
// //     borderTop: "2px solid #3498db",
// //   },
  
// //   totalValue: {
// //     padding: "8px 10px",
// //     textAlign: "right",
// //     fontWeight: "bold",
// //     fontSize: "14px",
// //     color: "#e74c3c",
// //     borderTop: "2px solid #3498db",
// //     backgroundColor: "#fff3f0",
// //   },
  
// //   loadingContainer: {
// //     display: "flex",
// //     flexDirection: "column",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     height: "100vh",
// //     backgroundColor: "#f5f5f5",
// //   },
  
// //   spinner: {
// //     width: "40px",
// //     height: "40px",
// //     border: "3px solid #f3f3f3",
// //     borderTop: "3px solid #3498db",
// //     borderRadius: "50%",
// //     animation: "spin 1s linear infinite",
// //     marginBottom: "15px",
// //   },
  
// //   errorContainer: {
// //     display: "flex",
// //     flexDirection: "column",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     height: "100vh",
// //     backgroundColor: "#f5f5f5",
// //     textAlign: "center",
// //     padding: "20px",
// //   },
// // };

// // // Fix style for totalLabel and totalValue to work with React
// // styles.totalLabel = {
// //   ...styles.totalLabel,
// //   textAlign: "right",
// // };

// // styles.totalValue = {
// //   ...styles.totalValue,
// //   textAlign: "right",
// // };

// // // Add keyframe animation for spinner
// // const styleSheet = document.createElement("style");
// // styleSheet.textContent = `
// //   @keyframes spin {
// //     0% { transform: rotate(0deg); }
// //     100% { transform: rotate(360deg); }
// //   }
// // `;
// // document.head.appendChild(styleSheet);


// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // // Format date 
// // const formatDate = (dateString) => {
// //   if (!dateString) return "-";

// //   const date = new Date(dateString);
// //   const day = date.getDate();
// //   const month = date.toLocaleString('default', { month: 'long' });
// //   const year = date.getFullYear();
  
// //   const getOrdinalSuffix = (day) => {
// //     if (day > 3 && day < 21) return 'th';
// //     switch (day % 10) {
// //       case 1: return 'st';
// //       case 2: return 'nd';
// //       case 3: return 'rd';
// //       default: return 'th';
// //     }
// //   };
  
// //   return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
// // };

// // // ================= MOCK DATA (MULTIPLE PO) =================

// // const poDataMap = {
// //   1: {
// //     pdfUrl: "https://drive.google.com/file/d/12821iKUZyIZN_zyFF94hwnUUBQSdcx38/preview",

// //     buyer_po_number: "FN26052",
// //     order_date: "2026-05-04",
// //     currency: "USD",
// //     value_of_goods: 11172,

// //     buyer_company: "FUNOMAD CO., LTD",
// //     buyer_contact: "KENNY LEE",
// //     buyer_email: "kennylee@funomad.com",

// //     vendor_company: "TER DEK, LLC",
// //     vendor_address: "8 M SON, IRVINE, CA 92618 US",

// //     items: [
// //       {
// //         vendor_sku: "10-2856",
// //         description: "Prism 856 Encoder",
// //         qty: 2,
// //         unit_price: 2793,
// //         discount_percent: 0,
// //         line_total: 5586
// //       },
// //       {
// //         vendor_sku: "10-2858",
// //         description: "Prism 858 Decoder",
// //         qty: 2,
// //         unit_price: 2793,
// //         discount_percent: 0,
// //         line_total: 5586
// //       }
// //     ]
// //   },

// //   2: {
// //     pdfUrl: "https://drive.google.com/file/d/1Ru5gfNxC8C0FEb-TWbGf1Ef9z4FQoKbc/preview",

// //     buyer_po_number: "CF2605-20905",
// //     order_date: "2026-05-01",
// //     currency: "USD",
// //     value_of_goods: 39.2,

// //     buyer_company: "Visuals Switzerland SA",
// //     buyer_contact: "+41 22 561 07 07",
// //     buyer_email: "procurement@visuals.ch",

// //     vendor_company: "Teradek LLC",
// //     vendor_address: "8 Mason Irvine, 92618 United States",

// //     items: [
// //       {
// //         vendor_sku: "01-0036",
// //         description: "Core 3.0 Basic Subscription (Monthly)",
// //         qty: 1,
// //         unit_price: 39.2,
// //         discount_percent: 0,
// //         line_total: 39.2
// //       }
// //     ]
// //   },
// //   3: {
// //   pdfUrl: "https://drive.google.com/file/d/1_1Gml6r-qyp_dn4e4wF08TBhZNB4lnHI/preview",

// //   buyer_po_number: "SS260501630J",
// //   order_date: "2026-05-01",
// //   currency: "USD",
// //   value_of_goods: 9319.88,

// //   buyer_company: "B&H PHOTO - VIDEO, INC.",
// //   buyer_contact: "Sol Salamon (#2665)",
// //   buyer_email: "yechiels@bhphoto.com",

// //   vendor_company: "SMALLHD, LLC",
// //   vendor_address: "301 GREGSON DR, CARY, NC 27511",

// //   items: [
// //     {
// //       vendor_sku: "SMLHDMCRFF36",
// //       description: "3' MICRO to FULL HDMI CABLE",
// //       qty: 30,
// //       unit_price: 17.49,
// //       discount_percent: 0,
// //       line_total: 524.7
// //     },
// //     {
// //       vendor_sku: "SMPWRPB4K2VM",
// //       description: "DUAL V-MOUNT BATTERY BRACKET",
// //       qty: 20,
// //       unit_price: 279.3,
// //       discount_percent: 0,
// //       line_total: 5586
// //     },
// //     {
// //       vendor_sku: "SMCSTANDSCRP",
// //       description: "C-STAND SCREW PACK",
// //       qty: 5,
// //       unit_price: 13.99,
// //       discount_percent: 0,
// //       line_total: 69.95
// //     },
// //     {
// //       vendor_sku: "SMCCK2000",
// //       description: "CAMERA CONTROL KIT",
// //       qty: 2,
// //       unit_price: 350,
// //       discount_percent: 0,
// //       line_total: 700
// //     },
// //     {
// //       vendor_sku: "SMSP500ACR",
// //       description: "ACRYLIC SCREEN PROTECTOR",
// //       qty: 1,
// //       unit_price: 3.5,
// //       discount_percent: 0,
// //       line_total: 3.5
// //     },
// //     {
// //       vendor_sku: "SMASP703UNU",
// //       description: "ANTI REFLECTIVE SCREEN PROTECTOR",
// //       qty: 4,
// //       unit_price: 27.99,
// //       discount_percent: 0,
// //       line_total: 111.96
// //     },
// //     {
// //       vendor_sku: "SM174308",
// //       description: "MICRO-USB TO 5PIN ADAPTER",
// //       qty: 2,
// //       unit_price: 62.99,
// //       discount_percent: 0,
// //       line_total: 125.98
// //     },
// //     {
// //       vendor_sku: "SM179008",
// //       description: "DIAL GUARD FOR ULTRA 10",
// //       qty: 1,
// //       unit_price: 27.99,
// //       discount_percent: 0,
// //       line_total: 27.99
// //     },
// //     {
// //       vendor_sku: "SM173001",
// //       description: "D-TAP TO 2-PIN POWER CABLE",
// //       qty: 20,
// //       unit_price: 101.5,
// //       discount_percent: 0,
// //       line_total: 2030
// //     },
// //     {
// //       vendor_sku: "SMSGLANTENNA",
// //       description: "REPLACEMENT ANTENNA",
// //       qty: 20,
// //       unit_price: 6.99,
// //       discount_percent: 0,
// //       line_total: 139.8
// //     }
// //   ]
// // }
// // };

// // // ================= COMPONENTS =================

// // const LoadingSpinner = () => (
// //   <div style={styles.loadingContainer}>
// //     <div style={styles.spinner}></div>
// //     <h2>Loading PO Details...</h2>
// //   </div>
// // );

// // const ErrorMessage = ({ message }) => (
// //   <div style={styles.errorContainer}>
// //     <h3>⚠️ Error Loading Data</h3>
// //     <p>{message}</p>
// //   </div>
// // );

// // const PDFViewer = ({ pdfUrl }) => (
// //   <div style={styles.pdfContainer}>
// //     <div style={styles.pdfHeader}>
// //       <h3>📄 Purchase Order Document</h3>
// //     </div>
// //     <div style={styles.pdfWrapper}>
// //       <iframe src={pdfUrl} style={styles.pdfIframe} title="PO Document" />
// //     </div>
// //   </div>
// // );

// // const POHeader = ({ data }) => (
// //   <div style={styles.card}>
// //     <h2 style={styles.sectionTitle}>📋 Purchase Order Details</h2>
// //     <div style={styles.infoGrid}>
// //       <div style={styles.infoItem}>
// //         <span style={styles.label}>PO Number:</span>
// //         <span style={styles.value}>{data.buyer_po_number}</span>
// //       </div>
// //       <div style={styles.infoItem}>
// //         <span style={styles.label}>Order Date:</span>
// //         <span style={styles.value}>{formatDate(data.order_date)}</span>
// //       </div>
// //       <div style={styles.infoItem}>
// //         <span style={styles.label}>Currency:</span>
// //         <span style={styles.value}>{data.currency}</span>
// //       </div>
// //       <div style={styles.infoItem}>
// //         <span style={styles.label}>Total Value:</span>
// //         <span style={styles.valueHighlight}>
// //           {data.currency} {parseFloat(data.value_of_goods || 0).toLocaleString()}
// //         </span>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const BuyerInfo = ({ data }) => (
// //   <div style={styles.card}>
// //     <h3 style={styles.subtitle}>🏢 Buyer Information</h3>
// //     <div style={styles.contactInfo}>
// //       <p><strong>Company:</strong> {data.buyer_company}</p>
// //       <p><strong>Contact:</strong> {data.buyer_contact}</p>
// //       <p><strong>Email:</strong> {data.buyer_email}</p>
// //     </div>
// //   </div>
// // );

// // const VendorInfo = ({ data }) => (
// //   <div style={styles.card}>
// //     <h3 style={styles.subtitle}>🏭 Vendor Information</h3>
// //     <div style={styles.contactInfo}>
// //       <p><strong>Company:</strong> {data.vendor_company}</p>
// //       <p><strong>Address:</strong> {data.vendor_address}</p>
// //     </div>
// //   </div>
// // );

// // const LineItemsTable = ({ items, currency }) => {
// //   const grandTotal = items.reduce(
// //     (sum, item) => sum + (parseFloat(item.line_total) || 0),
// //     0
// //   );

// //   return (
// //     <div style={styles.card}>
// //       <h3 style={styles.subtitle}>📦 Line Items</h3>
// //       <div style={styles.tableContainer}>
// //         <table style={styles.table}>
// //           <thead>
// //             <tr style={styles.tableHeader}>
// //               <th style={styles.th}>SKU</th>
// //               <th style={styles.th}>Description</th>
// //               <th style={styles.th}>Qty</th>
// //               <th style={styles.th}>Unit Price</th>
// //               <th style={styles.th}>Discount (%)</th>
// //               <th style={styles.th}>Line Total</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {items.map((item, index) => (
// //               <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
// //                 <td style={styles.td}>{item.vendor_sku}</td>
// //                 <td style={styles.td}>{item.description}</td>
// //                 <td style={styles.tdCentered}>{item.qty}</td>
// //                 <td style={styles.tdRight}>{item.unit_price}</td>
// //                 <td style={styles.tdRight}>{item.discount_percent}</td>
// //                 <td style={styles.tdRightHighlight}>{item.line_total}</td>
// //               </tr>
// //             ))}
// //             <tr style={styles.totalRow}>
// //               <td colSpan="5" style={styles.totalLabel}>Total Value:</td>
// //               <td style={styles.totalValue}>
// //                 {currency} {grandTotal.toLocaleString()}
// //               </td>
// //             </tr>
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // const RightPanel = ({ data }) => (
// //   <div style={styles.rightPanel}>
// //     <POHeader data={data} />
// //     <BuyerInfo data={data} />
// //     <VendorInfo data={data} />
// //     <LineItemsTable items={data.items} currency={data.currency} />
// //   </div>
// // );

// // const MainLayout = ({ data }) => (
// //   <div style={styles.mainContainer}>
// //     <PDFViewer pdfUrl={data.pdfUrl} />
// //     <RightPanel data={data} />
// //   </div>
// // );

// // // ================= MAIN =================

// // export default function PoViewer() {
// //   const { id } = useParams();
// //   const [data, setData] = useState(null);

// //   useEffect(() => {
// //     setData(null); // reset for loading

// //     const selectedData = poDataMap[id];

// //     setTimeout(() => {
// //       setData(selectedData || null);
// //     }, 500);
// //   }, [id]);

// //   if (!data) return <LoadingSpinner />;

// //   return <MainLayout data={data} />;
// // }
// // // // ============== STYLES ==============

// // const styles = {
// //   // Layout Styles - Full height alignment
// //   mainContainer: {
// //     display: "flex",
// //     height: "100vh",
// //     backgroundColor: "#f5f5f5",
// //     overflow: "hidden",
// //   },
  
// //   pdfContainer: {
// //     flex: "1",
// //     width: "50%",
// //     backgroundColor: "#fff",
// //     boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
// //     display: "flex",
// //     flexDirection: "column",
// //     height: "100vh",
// //   },
  
// //   pdfHeader: {
// //     padding: "12px 16px",
// //     backgroundColor: "#2c3e50",
// //     color: "white",
// //     borderBottom: "2px solid #3498db",
// //     fontSize: "14px",
// //     flexShrink: 0,
// //   },
  
// //   pdfWrapper: {
// //     flex: 1,
// //     overflow: "auto",
// //     position: "relative",
// //   },
  
// //   pdfIframe: {
// //     width: "100%",
// //     height: "100%",
// //     border: "none",
// //   },
  
// //   rightPanel: {
// //     flex: "1",
// //     width: "50%",
// //     padding: "16px",
// //     overflowY: "auto",
// //     height: "100vh",
// //     backgroundColor: "#f5f5f5",
// //   },
  
// //   card: {
// //     backgroundColor: "white",
// //     borderRadius: "6px",
// //     padding: "14px 16px",
// //     marginBottom: "16px",
// //     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //   },
  
// //   sectionTitle: {
// //     margin: "0 0 12px 0",
// //     color: "#2c3e50",
// //     fontSize: "16px",
// //     borderBottom: "2px solid #3498db",
// //     paddingBottom: "6px",
// //   },
  
// //   subtitle: {
// //     margin: "0 0 10px 0",
// //     color: "#34495e",
// //     fontSize: "15px",
// //   },
  
// //   infoGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
// //     gap: "10px",
// //   },
  
// //   infoItem: {
// //     display: "flex",
// //     flexDirection: "column",
// //   },
  
// //   label: {
// //     fontSize: "10px",
// //     color: "#7f8c8d",
// //     textTransform: "uppercase",
// //     fontWeight: "bold",
// //     marginBottom: "3px",
// //   },
  
// //   value: {
// //     fontSize: "13px",
// //     color: "#2c3e50",
// //     fontWeight: "500",
// //   },
  
// //   valueHighlight: {
// //     fontSize: "15px",
// //     color: "#e74c3c",
// //     fontWeight: "bold",
// //   },
  
// //   contactInfo: {
// //     lineHeight: "1.4",
// //     fontSize: "13px",
// //   },
  
// //   link: {
// //     color: "#3498db",
// //     textDecoration: "none",
// //   },
  
// //   tableContainer: {
// //     overflowX: "auto",
// //   },
  
// //   table: {
// //     width: "100%",
// //     borderCollapse: "collapse",
// //     fontSize: "12px",
// //   },
  
// //   tableHeader: {
// //     backgroundColor: "#34495e",
// //     color: "white",
// //   },
  
// //   th: {
// //     padding: "8px 10px",
// //     textAlign: "left",
// //     fontWeight: "bold",
// //     borderBottom: "2px solid #2c3e50",
// //     fontSize: "11px",
// //   },
  
// //   td: {
// //     padding: "6px 10px",
// //     borderBottom: "1px solid #ecf0f1",
// //     fontSize: "12px",
// //   },
  
// //   tdCentered: {
// //     padding: "6px 10px",
// //     textAlign: "center",
// //     borderBottom: "1px solid #ecf0f1",
// //     fontSize: "12px",
// //   },
  
// //   tdRight: {
// //     padding: "6px 10px",
// //     textAlign: "right",
// //     borderBottom: "1px solid #ecf0f1",
// //     fontSize: "12px",
// //   },
  
// //   tdRightHighlight: {
// //     padding: "6px 10px",
// //     textAlign: "right",
// //     fontWeight: "bold",
// //     color: "#e74c3c",
// //     borderBottom: "1px solid #ecf0f1",
// //     fontSize: "12px",
// //   },
  
// //   tableRowEven: {
// //     backgroundColor: "#fff",
// //   },
  
// //   tableRowOdd: {
// //     backgroundColor: "#f9f9f9",
// //   },
  
// //   // New styles for total row
// //   totalRow: {
// //     backgroundColor: "#f0f0f0",
// //     fontWeight: "bold",
// //     borderTop: "2px solid #3498db",
// //   },
  
// //   totalLabel: {
// //     padding: "8px 10px",
// //     textAlign: "right",
// //     fontWeight: "bold",
// //     fontSize: "13px",
// //     color: "#2c3e50",
// //     borderTop: "2px solid #3498db",
// //   },
  
// //   totalValue: {
// //     padding: "8px 10px",
// //     textAlign: "right",
// //     fontWeight: "bold",
// //     fontSize: "14px",
// //     color: "#e74c3c",
// //     borderTop: "2px solid #3498db",
// //     backgroundColor: "#fff3f0",
// //   },
  
// //   loadingContainer: {
// //     display: "flex",
// //     flexDirection: "column",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     height: "100vh",
// //     backgroundColor: "#f5f5f5",
// //   },
  
// //   spinner: {
// //     width: "40px",
// //     height: "40px",
// //     border: "3px solid #f3f3f3",
// //     borderTop: "3px solid #3498db",
// //     borderRadius: "50%",
// //     animation: "spin 1s linear infinite",
// //     marginBottom: "15px",
// //   },
  
// //   errorContainer: {
// //     display: "flex",
// //     flexDirection: "column",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     height: "100vh",
// //     backgroundColor: "#f5f5f5",
// //     textAlign: "center",
// //     padding: "20px",
// //   },
// // };
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// // Format date: "4th May 2026"
// const formatDate = (dateString) => {
//   if (!dateString) return "-";

//   const date = new Date(dateString);
//   const day = date.getDate();
//   const month = date.toLocaleString('default', { month: 'long' });
//   const year = date.getFullYear();

//   const getOrdinalSuffix = (day) => {
//     if (day > 3 && day < 21) return 'th';
//     switch (day % 10) {
//       case 1: return 'st';
//       case 2: return 'nd';
//       case 3: return 'rd';
//       default: return 'th';
//     }
//   };

//   return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
// };

// // ================= MOCK DATA (MULTIPLE PO) =================

// const poDataMap = {
//   1: {
//     pdfUrl: "https://drive.google.com/file/d/12821iKUZyIZN_zyFF94hwnUUBQSdcx38/preview",

//     buyer_po_number: "FN26052",
//     order_date: "2026-05-04",
//     currency: "USD",
//     value_of_goods: 11172,

//     buyer_company: "FUNOMAD CO., LTD",
//     buyer_contact: "KENNY LEE",
//     buyer_email: "kennylee@funomad.com",

//     vendor_company: "TER DEK, LLC",
//     vendor_address: "8 M SON, IRVINE, CA 92618 US",

//     items: [
//       {
//         vendor_sku: "10-2856",
//         description: "Prism 856 Encoder",
//         qty: 2,
//         unit_price: 2793,
//         discount_percent: 0,
//         line_total: 5586
//       },
//       {
//         vendor_sku: "10-2858",
//         description: "Prism 858 Decoder",
//         qty: 2,
//         unit_price: 2793,
//         discount_percent: 0,
//         line_total: 5586
//       }
//     ]
//   },

//   121: {
//     pdfUrl: "https://drive.google.com/file/d/1Ru5gfNxC8C0FEb-TWbGf1Ef9z4FQoKbc/preview",

//     buyer_po_number: "CF2605-20905",
//     order_date: "2026-05-01",
//     currency: "USD",
//     value_of_goods: 39.2,

//     buyer_company: "Visuals Switzerland SA",
//     buyer_contact: "+41 22 561 07 07",
//     buyer_email: "procurement@visuals.ch",

//     vendor_company: "Teradek LLC",
//     vendor_address: "8 Mason Irvine, 92618 United States",

//     items: [
//       {
//         vendor_sku: "01-0036",
//         description: "Core 3.0 Basic Subscription (Monthly)",
//         qty: 1,
//         unit_price: 39.2,
//         discount_percent: 0,
//         line_total: 39.2
//       }
//     ]
//   },
//   3: {
//     pdfUrl: "https://drive.google.com/file/d/1_1Gml6r-qyp_dn4e4wF08TBhZNB4lnHI/preview",

//     buyer_po_number: "SS260501630J",
//     order_date: "2026-05-01",
//     currency: "USD",
//     value_of_goods: 9319.88,

//     buyer_company: "B&H PHOTO - VIDEO, INC.",
//     buyer_contact: "Sol Salamon (#2665)",
//     buyer_email: "yechiels@bhphoto.com",

//     vendor_company: "SMALLHD, LLC",
//     vendor_address: "301 GREGSON DR, CARY, NC 27511",

//     items: [
//       {
//         vendor_sku: "SMLHDMCRFF36",
//         description: "3' MICRO to FULL HDMI CABLE",
//         qty: 30,
//         unit_price: 17.49,
//         discount_percent: 0,
//         line_total: 524.7
//       },
//       {
//         vendor_sku: "SMPWRPB4K2VM",
//         description: "DUAL V-MOUNT BATTERY BRACKET",
//         qty: 20,
//         unit_price: 279.3,
//         discount_percent: 0,
//         line_total: 5586
//       },
//       {
//         vendor_sku: "SMCSTANDSCRP",
//         description: "C-STAND SCREW PACK",
//         qty: 5,
//         unit_price: 13.99,
//         discount_percent: 0,
//         line_total: 69.95
//       },
//       {
//         vendor_sku: "SMCCK2000",
//         description: "CAMERA CONTROL KIT",
//         qty: 2,
//         unit_price: 350,
//         discount_percent: 0,
//         line_total: 700
//       },
//       {
//         vendor_sku: "SMSP500ACR",
//         description: "ACRYLIC SCREEN PROTECTOR",
//         qty: 1,
//         unit_price: 3.5,
//         discount_percent: 0,
//         line_total: 3.5
//       },
//       {
//         vendor_sku: "SMASP703UNU",
//         description: "ANTI REFLECTIVE SCREEN PROTECTOR",
//         qty: 4,
//         unit_price: 27.99,
//         discount_percent: 0,
//         line_total: 111.96
//       },
//       {
//         vendor_sku: "SM174308",
//         description: "MICRO-USB TO 5PIN ADAPTER",
//         qty: 2,
//         unit_price: 62.99,
//         discount_percent: 0,
//         line_total: 125.98
//       },
//       {
//         vendor_sku: "SM179008",
//         description: "DIAL GUARD FOR ULTRA 10",
//         qty: 1,
//         unit_price: 27.99,
//         discount_percent: 0,
//         line_total: 27.99
//       },
//       {
//         vendor_sku: "SM173001",
//         description: "D-TAP TO 2-PIN POWER CABLE",
//         qty: 20,
//         unit_price: 101.5,
//         discount_percent: 0,
//         line_total: 2030
//       },
//       {
//         vendor_sku: "SMSGLANTENNA",
//         description: "REPLACEMENT ANTENNA",
//         qty: 20,
//         unit_price: 6.99,
//         discount_percent: 0,
//         line_total: 139.8
//       }
//     ]
//   }
// };

// // ================= COMPONENTS =================

// const LoadingSpinner = () => (
//   <div style={styles.loadingContainer}>
//     <div style={styles.spinner}></div>
//     <h2>Loading PO Details...</h2>
//   </div>
// );

// const PDFViewer = ({ pdfUrl }) => (
//   <div style={styles.pdfContainer}>
//     <div style={styles.pdfHeader}>
//       <h3>📄 Purchase Order Document</h3>
//     </div>
//     <div style={styles.pdfWrapper}>
//       <iframe src={pdfUrl} style={styles.pdfIframe} title="PO Document" />
//     </div>
//   </div>
// );

// // Left side - Key Information (PO Number, Order Date, Total Value)
// const KeyInfoPanel = ({ data }) => (
//   <div style={styles.keyInfoPanel}>
//     <div style={styles.keyInfoCard}>
//       {/* PO Number Row */}
//       <div style={styles.keyInfoRow}>
//         <span style={styles.keyInfoLabel}>PO Number :</span>
//         <span style={styles.keyInfoValue}>{data.buyer_po_number}</span>
//       </div>
//       <div style={styles.keyInfoDivider} />
//       {/* Order Date Row */}
//       <div style={styles.keyInfoRow}>
//         <span style={styles.keyInfoLabel}>Order Date :</span>
//         <span style={styles.keyInfoValue}>{formatDate(data.order_date)}</span>
//       </div>
//       <div style={styles.keyInfoDivider} />
//       {/* Total Value Row */}
//       <div style={styles.keyInfoRow}>
//         <span style={styles.keyInfoLabel}>Total Value :</span>
//         <span style={styles.keyInfoValueHighlight}>
//           {data.currency} {parseFloat(data.value_of_goods || 0).toLocaleString()}
//         </span>
//       </div>
//     </div>
//   </div>
// );

// const BuyerInfo = ({ data }) => (
//   <div style={styles.card}>
//     <h3 style={styles.subtitle}>🏢 Buyer Information</h3>
//     <div style={styles.contactInfo}>
//       <p><strong>Company:</strong> {data.buyer_company}</p>
//       <p><strong>Contact:</strong> {data.buyer_contact}</p>
//       <p><strong>Email:</strong> {data.buyer_email}</p>
//     </div>
//   </div>
// );

// const VendorInfo = ({ data }) => (
//   <div style={styles.card}>
//     <h3 style={styles.subtitle}>🏭 Vendor Information</h3>
//     <div style={styles.contactInfo}>
//       <p><strong>Company:</strong> {data.vendor_company}</p>
//       <p><strong>Address:</strong> {data.vendor_address}</p>
//     </div>
//   </div>
// );

// const LineItemsTable = ({ items, currency }) => {
//   const grandTotal = items.reduce(
//     (sum, item) => sum + (parseFloat(item.line_total) || 0),
//     0
//   );

//   return (
//     <div style={styles.card}>
//       <h3 style={styles.subtitle}>📦 Line Items</h3>
//       <div style={styles.tableContainer}>
//         <table style={styles.table}>
//           <thead>
//             <tr style={styles.tableHeader}>
//               <th style={styles.th}>SKU</th>
//               <th style={styles.th}>Description</th>
//               <th style={styles.th}>Qty</th>
//               <th style={styles.th}>Unit Price</th>
//               <th style={styles.th}>Discount (%)</th>
//               <th style={styles.th}>Line Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item, index) => (
//               <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
//                 <td style={styles.td}>{item.vendor_sku}</td>
//                 <td style={styles.td}>{item.description}</td>
//                 <td style={styles.tdCentered}>{item.qty}</td>
//                 <td style={styles.tdRight}>{item.unit_price}</td>
//                 <td style={styles.tdRight}>{item.discount_percent}</td>
//                 <td style={styles.tdRightHighlight}>{item.line_total}</td>
//               </tr>
//             ))}
//             <tr style={styles.totalRow}>
//               <td colSpan="5" style={styles.totalLabel}>Total Value:</td>
//               <td style={styles.totalValue}>
//                 {currency} {grandTotal.toLocaleString()}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // Right side - Everything except the left panel (Buyer, Vendor, Items)
// const RightPanel = ({ data }) => (
//   <div style={styles.rightPanel}>
//     <BuyerInfo data={data} />
//     <VendorInfo data={data} />
//     <LineItemsTable items={data.items} currency={data.currency} />
//   </div>
// );

// // Main layout with left panel (Key Info) and right panel (all other details)
// const MainLayout = ({ data }) => (
//   <div style={styles.mainContainer}>
//     <PDFViewer pdfUrl={data.pdfUrl} />
//     <div style={styles.detailsContainer}>
//       <KeyInfoPanel data={data} />
//       <RightPanel data={data} />
//     </div>
//   </div>
// );

// // ================= MAIN =================

// export default function PoViewer() {
//   const { id } = useParams();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     setData(null); // reset for loading

//     const selectedData = poDataMap[id];

//     setTimeout(() => {
//       setData(selectedData || null);
//     }, 500);
//   }, [id]);

//   if (!data) return <LoadingSpinner />;

//   return <MainLayout data={data} />;
// }

// // ============== STYLES ==============

// const styles = {
//   // Layout Styles
//   mainContainer: {
//     display: "flex",
//     height: "100vh",
//     backgroundColor: "#f5f5f5",
//     overflow: "hidden",
//   },

//   pdfContainer: {
//     flex: "1",
//     width: "50%",
//     backgroundColor: "#fff",
//     boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
//     display: "flex",
//     flexDirection: "column",
//     height: "100vh",
//   },

//   pdfHeader: {
//     padding: "12px 16px",
//     backgroundColor: "#2c3e50",
//     color: "white",
//     borderBottom: "2px solid #3498db",
//     fontSize: "14px",
//     flexShrink: 0,
//   },

//   pdfWrapper: {
//     flex: 1,
//     overflow: "auto",
//     position: "relative",
//   },

//   pdfIframe: {
//     width: "100%",
//     height: "100%",
//     border: "none",
//   },

//   detailsContainer: {
//     flex: "1",
//     width: "50%",
//     display: "flex",
//     flexDirection: "column",
//     height: "100vh",
//     overflow: "hidden",
//     backgroundColor: "#f5f5f5",
//   },

//   // Left side - Key Info Panel (styled like the image)
//   keyInfoPanel: {
//     padding: "16px 16px 0 16px",
//     flexShrink: 0,
//   },

//   keyInfoCard: {
//     backgroundColor: "white",
//     borderRadius: "6px",
//     padding: "0",
//     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//     overflow: "hidden",
//   },

//   keyInfoRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "12px 16px",
//     backgroundColor: "white",
//   },

//   keyInfoDivider: {
//     height: "1px",
//     backgroundColor: "#e9ecef",
//     margin: "0",
//   },

//   keyInfoLabel: {
//     fontSize: "12px",
//     color: "#6c757d",
//     fontWeight: "500",
//     letterSpacing: "0.3px",
//   },

//   keyInfoValue: {
//     fontSize: "14px",
//     color: "#212529",
//     fontWeight: "600",
//   },

//   keyInfoValueHighlight: {
//     fontSize: "14px",
//     color: "#e74c3c",
//     fontWeight: "700",
//   },

//   rightPanel: {
//     flex: 1,
//     padding: "0 16px 16px 16px",
//     overflowY: "auto",
//     backgroundColor: "#f5f5f5",
//   },

//   card: {
//     backgroundColor: "white",
//     borderRadius: "6px",
//     padding: "14px 16px",
//     marginBottom: "16px",
//     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//   },

//   sectionTitle: {
//     margin: "0 0 12px 0",
//     color: "#2c3e50",
//     fontSize: "16px",
//     borderBottom: "2px solid #3498db",
//     paddingBottom: "6px",
//   },

//   subtitle: {
//     margin: "0 0 10px 0",
//     color: "#34495e",
//     fontSize: "15px",
//   },

//   contactInfo: {
//     lineHeight: "1.4",
//     fontSize: "13px",
//   },

//   tableContainer: {
//     overflowX: "auto",
//   },

//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     fontSize: "12px",
//   },

//   tableHeader: {
//     backgroundColor: "#34495e",
//     color: "white",
//   },

//   th: {
//     padding: "8px 10px",
//     textAlign: "left",
//     fontWeight: "bold",
//     borderBottom: "2px solid #2c3e50",
//     fontSize: "11px",
//   },

//   td: {
//     padding: "6px 10px",
//     borderBottom: "1px solid #ecf0f1",
//     fontSize: "12px",
//   },

//   tdCentered: {
//     padding: "6px 10px",
//     textAlign: "center",
//     borderBottom: "1px solid #ecf0f1",
//     fontSize: "12px",
//   },

//   tdRight: {
//     padding: "6px 10px",
//     textAlign: "right",
//     borderBottom: "1px solid #ecf0f1",
//     fontSize: "12px",
//   },

//   tdRightHighlight: {
//     padding: "6px 10px",
//     textAlign: "right",
//     fontWeight: "bold",
//     color: "#e74c3c",
//     borderBottom: "1px solid #ecf0f1",
//     fontSize: "12px",
//   },

//   tableRowEven: {
//     backgroundColor: "#fff",
//   },

//   tableRowOdd: {
//     backgroundColor: "#f9f9f9",
//   },

//   totalRow: {
//     backgroundColor: "#f0f0f0",
//     fontWeight: "bold",
//     borderTop: "2px solid #3498db",
//   },

//   totalLabel: {
//     padding: "8px 10px",
//     textAlign: "right",
//     fontWeight: "bold",
//     fontSize: "13px",
//     color: "#2c3e50",
//     borderTop: "2px solid #3498db",
//   },

//   totalValue: {
//     padding: "8px 10px",
//     textAlign: "right",
//     fontWeight: "bold",
//     fontSize: "14px",
//     color: "#e74c3c",
//     borderTop: "2px solid #3498db",
//     backgroundColor: "#fff3f0",
//   },

//   loadingContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     backgroundColor: "#f5f5f5",
//   },

//   spinner: {
//     width: "40px",
//     height: "40px",
//     border: "3px solid #f3f3f3",
//     borderTop: "3px solid #3498db",
//     borderRadius: "50%",
//     animation: "spin 1s linear infinite",
//     marginBottom: "15px",
//   },
// };

// // Add keyframes for spinner animation
// const styleSheet = document.createElement("style");
// styleSheet.textContent = `
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
// `;
// document.head.appendChild(styleSheet);
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Format date 
const formatDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

// ================= MOCK DATA (MULTIPLE PO) =================

const poDataMap = {
  1: {
    pdfUrl: "https://drive.google.com/file/d/12821iKUZyIZN_zyFF94hwnUUBQSdcx38/preview",

    buyer_po_number: "FN26052",
    order_date: "2026-05-04",
    currency: "USD",
    value_of_goods: 11172,

    buyer_company: "FUNOMAD CO., LTD",
    buyer_contact: "KENNY LEE",
    buyer_email: "kennylee@funomad.com",

    vendor_company: "TER DEK, LLC",
    vendor_address: "8 M SON, IRVINE, CA 92618 US",

    items: [
      {
        vendor_sku: "10-2856",
        description: "Prism 856 Encoder",
        qty: 2,
        unit_price: 2793,
        discount_percent: 0,
        line_total: 5586
      },
      {
        vendor_sku: "10-2858",
        description: "Prism 858 Decoder",
        qty: 2,
        unit_price: 2793,
        discount_percent: 0,
        line_total: 5586
      }
    ]
  },

  121: {
    pdfUrl: "https://drive.google.com/file/d/1Ru5gfNxC8C0FEb-TWbGf1Ef9z4FQoKbc/preview",

    buyer_po_number: "CF2605-20905",
    order_date: "2026-05-01",
    currency: "USD",
    value_of_goods: 39.2,

    buyer_company: "Visuals Switzerland SA",
    buyer_contact: "+41 22 561 07 07",
    buyer_email: "procurement@visuals.ch",

    vendor_company: "Teradek LLC",
    vendor_address: "8 Mason Irvine, 92618 United States",

    items: [
      {
        vendor_sku: "01-0036",
        description: "Core 3.0 Basic Subscription (Monthly)",
        qty: 1,
        unit_price: 39.2,
        discount_percent: 0,
        line_total: 39.2
      }
    ]
  },
  3: {
  pdfUrl: "https://drive.google.com/file/d/1_1Gml6r-qyp_dn4e4wF08TBhZNB4lnHI/preview",

  buyer_po_number: "SS260501630J",
  order_date: "2026-05-01",
  currency: "USD",
  value_of_goods: 9319.88,

  buyer_company: "B&H PHOTO - VIDEO, INC.",
  buyer_contact: "Sol Salamon (#2665)",
  buyer_email: "yechiels@bhphoto.com",

  vendor_company: "SMALLHD, LLC",
  vendor_address: "301 GREGSON DR, CARY, NC 27511",

  items: [
    {
      vendor_sku: "SMLHDMCRFF36",
      description: "3' MICRO to FULL HDMI CABLE",
      qty: 30,
      unit_price: 17.49,
      discount_percent: 0,
      line_total: 524.7
    },
    {
      vendor_sku: "SMPWRPB4K2VM",
      description: "DUAL V-MOUNT BATTERY BRACKET",
      qty: 20,
      unit_price: 279.3,
      discount_percent: 0,
      line_total: 5586
    },
    {
      vendor_sku: "SMCSTANDSCRP",
      description: "C-STAND SCREW PACK",
      qty: 5,
      unit_price: 13.99,
      discount_percent: 0,
      line_total: 69.95
    },
    {
      vendor_sku: "SMCCK2000",
      description: "CAMERA CONTROL KIT",
      qty: 2,
      unit_price: 350,
      discount_percent: 0,
      line_total: 700
    },
    {
      vendor_sku: "SMSP500ACR",
      description: "ACRYLIC SCREEN PROTECTOR",
      qty: 1,
      unit_price: 3.5,
      discount_percent: 0,
      line_total: 3.5
    },
    {
      vendor_sku: "SMASP703UNU",
      description: "ANTI REFLECTIVE SCREEN PROTECTOR",
      qty: 4,
      unit_price: 27.99,
      discount_percent: 0,
      line_total: 111.96
    },
    {
      vendor_sku: "SM174308",
      description: "MICRO-USB TO 5PIN ADAPTER",
      qty: 2,
      unit_price: 62.99,
      discount_percent: 0,
      line_total: 125.98
    },
    {
      vendor_sku: "SM179008",
      description: "DIAL GUARD FOR ULTRA 10",
      qty: 1,
      unit_price: 27.99,
      discount_percent: 0,
      line_total: 27.99
    },
    {
      vendor_sku: "SM173001",
      description: "D-TAP TO 2-PIN POWER CABLE",
      qty: 20,
      unit_price: 101.5,
      discount_percent: 0,
      line_total: 2030
    },
    {
      vendor_sku: "SMSGLANTENNA",
      description: "REPLACEMENT ANTENNA",
      qty: 20,
      unit_price: 6.99,
      discount_percent: 0,
      line_total: 139.8
    }
  ]
}
};

// ================= COMPONENTS =================

const LoadingSpinner = () => (
  <div style={styles.loadingContainer}>
    <div style={styles.spinner}></div>
    <h2>Loading PO Details...</h2>
  </div>
);

const PDFViewer = ({ pdfUrl }) => (
  <div style={styles.pdfContainer}>
    <div style={styles.pdfHeader}>
      <h3>📄 Purchase Order Document</h3>
    </div>
    <div style={styles.pdfWrapper}>
      <iframe src={pdfUrl} style={styles.pdfIframe} title="PO Document" />
    </div>
  </div>
);

// New compact header component with company, PO number, and order date
const CompactHeader = ({ data }) => (
  <div style={styles.compactHeader}>
    <div style={styles.compactHeaderItem}>
      <span style={styles.compactLabel}>Company Name</span>
      <span style={styles.compactValue}>{data.buyer_company}</span>
    </div>
    <div style={styles.compactHeaderCenter}>
      <div style={styles.poNumberWrapper}>
        <span style={styles.compactLabel}>PO Number: </span>
        <span style={styles.compactValue}>{data.buyer_po_number}</span>
      </div>
      <div style={styles.compactLabel}>Order Date: {formatDate(data.order_date)}</div>
    </div>
  </div>
);

// Vendor & Supplier info in flex row format
const VendorSupplierInfo = ({ data }) => (
  <div style={styles.vendorSupplierContainer}>
    <div style={styles.vendorSection}>
      <h3 style={styles.vendorSupplierTitle}>🏭 Vendor Information</h3>
      <div style={styles.vendorSupplierContent}>
        <p><strong>Company:</strong> {data.vendor_company}</p>
        <p><strong>Address:</strong> {data.vendor_address}</p>
      </div>
    </div>
    <div style={styles.supplierSection}>
      <h3 style={styles.vendorSupplierTitle}>🏢 Supplier Information</h3>
      <div style={styles.vendorSupplierContent}>
        <p><strong>Company:</strong> {data.buyer_company}</p>
        <p><strong>Contact:</strong> {data.buyer_contact}</p>
        <p><strong>Email:</strong> {data.buyer_email}</p>
      </div>
    </div>
  </div>
);

const LineItemsTable = ({ items, currency }) => {
  const grandTotal = items.reduce(
    (sum, item) => sum + (parseFloat(item.line_total) || 0),
    0
  );

  return (
    <div style={styles.card}>
      <h3 style={styles.subtitle}>📦 Line Items</h3>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>SKU</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Unit Price</th>
              <th style={styles.th}>Discount (%)</th>
              <th style={styles.th}>Line Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                <td style={styles.td}>{item.vendor_sku}</td>
                <td style={styles.td}>{item.description}</td>
                <td style={styles.tdCentered}>{item.qty}</td>
                <td style={styles.tdRight}>{currency} {item.unit_price.toLocaleString()}</td>
                <td style={styles.tdRight}>{item.discount_percent}%</td>
                <td style={styles.tdRightHighlight}>{currency} {item.line_total.toLocaleString()}</td>
              </tr>
            ))}
            <tr style={styles.totalRow}>
              <td colSpan="5" style={styles.totalLabel}>Total Value:</td>
              <td style={styles.totalValue}>
                {currency} {grandTotal.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RightPanel = ({ data }) => (
  <div style={styles.rightPanel}>
    <CompactHeader data={data} />
    <VendorSupplierInfo data={data} />
    <LineItemsTable items={data.items} currency={data.currency} />
  </div>
);

const MainLayout = ({ data }) => (
  <div style={styles.mainContainer}>
    <PDFViewer pdfUrl={data.pdfUrl} />
    <RightPanel data={data} />
  </div>
);

// ================= MAIN =================

export default function PoViewer() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);

    const selectedData = poDataMap[id];

    setTimeout(() => {
      setData(selectedData || null);
    }, 500);
  }, [id]);

  if (!data) return <LoadingSpinner />;

  return <MainLayout data={data} />;
}

// ============== STYLES ==============

const styles = {
  mainContainer: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },
  
  pdfContainer: {
    flex: "1",
    width: "50%",
    backgroundColor: "#fff",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  
  pdfHeader: {
    padding: "12px 16px",
    backgroundColor: "#2c3e50",
    color: "white",
    borderBottom: "2px solid #3498db",
    fontSize: "14px",
    flexShrink: 0,
  },
  
  pdfWrapper: {
    flex: 1,
    overflow: "auto",
    position: "relative",
  },
  
  pdfIframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
  
  rightPanel: {
    flex: "1",
    width: "50%",
    padding: "16px",
    overflowY: "auto",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  
  // New compact header styles
  compactHeader: {
    backgroundColor: "white",
    borderRadius: "6px",
    padding: "14px 20px",
    marginBottom: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },
  
  compactHeaderItem: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  
  compactHeaderCenter: {
    flex: 2,
    textAlign: "center",
  },
  
  poNumberWrapper: {
    marginBottom: "8px",
  },
  
  compactLabel: {
    fontSize: "10px",
    color: "#7f8c8d",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: "4px",
    letterSpacing: "0.5px",
  },
  
  compactValue: {
    fontSize: "14px",
    color: "#2c3e50",
    fontWeight: "600",
  },
  
  // Vendor & Supplier flex container
  vendorSupplierContainer: {
    display: "flex",
    gap: "16px",
    marginBottom: "16px",
  },
  
  vendorSection: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: "6px",
    padding: "14px 16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  
  supplierSection: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: "6px",
    padding: "14px 16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  
  vendorSupplierTitle: {
    margin: "0 0 10px 0",
    color: "#2c3e50",
    fontSize: "13px",
    borderBottom: "2px solid #3498db",
    paddingBottom: "6px",
    display: "inline-block",
  },
  
  vendorSupplierContent: {
    lineHeight: "1.5",
    fontSize: "12px",
  },
  
  card: {
    backgroundColor: "white",
    borderRadius: "6px",
    padding: "14px 16px",
    marginBottom: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  
  subtitle: {
    margin: "0 0 10px 0",
    color: "#34495e",
    fontSize: "14px",
    borderBottom: "2px solid #3498db",
    paddingBottom: "6px",
    display: "inline-block",
  },
  
  tableContainer: {
    overflowX: "auto",
  },
  
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "12px",
  },
  
  tableHeader: {
    backgroundColor: "#34495e",
    color: "white",
  },
  
  th: {
    padding: "8px 10px",
    textAlign: "left",
    fontWeight: "bold",
    borderBottom: "2px solid #2c3e50",
    fontSize: "11px",
  },
  
  td: {
    padding: "6px 10px",
    borderBottom: "1px solid #ecf0f1",
    fontSize: "12px",
  },
  
  tdCentered: {
    padding: "6px 10px",
    textAlign: "center",
    borderBottom: "1px solid #ecf0f1",
    fontSize: "12px",
  },
  
  tdRight: {
    padding: "6px 10px",
    textAlign: "right",
    borderBottom: "1px solid #ecf0f1",
    fontSize: "12px",
  },
  
  tdRightHighlight: {
    padding: "6px 10px",
    textAlign: "right",
    fontWeight: "bold",
    color: "#e74c3c",
    borderBottom: "1px solid #ecf0f1",
    fontSize: "12px",
  },
  
  tableRowEven: {
    backgroundColor: "#fff",
  },
  
  tableRowOdd: {
    backgroundColor: "#f9f9f9",
  },
  
  totalRow: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    borderTop: "2px solid #3498db",
  },
  
  totalLabel: {
    padding: "8px 10px",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "13px",
    color: "#2c3e50",
    borderTop: "2px solid #3498db",
  },
  
  totalValue: {
    padding: "8px 10px",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#e74c3c",
    borderTop: "2px solid #3498db",
    backgroundColor: "#fff3f0",
  },
  
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #f3f3f3",
    borderTop: "3px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "15px",
  },
};

// Add keyframes for spinner animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);