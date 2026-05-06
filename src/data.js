import { useEffect, useState } from "react";

// Format date 
const formatDate = (dateString) => {
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

// ================= COMPONENTS =================

// Loader
const LoadingSpinner = () => (
  <div style={styles.loadingContainer}>
    <div style={styles.spinner}></div>
    <h2>Loading PO Details...</h2>
  </div>
);

// Error
const ErrorMessage = ({ message }) => (
  <div style={styles.errorContainer}>
    <h3>⚠️ Error</h3>
    <p>{message}</p>
  </div>
);

// PDF Viewer
const PDFViewer = ({ pdfUrl }) => (
  <div style={styles.pdfContainer}>
    <div style={styles.pdfHeader}>📄 Purchase Order Document</div>
    <iframe src={pdfUrl} style={styles.pdfIframe} title="PO PDF" />
  </div>
);

// Header
const POHeader = ({ data }) => (
  <div style={styles.card}>
    <h2 style={styles.sectionTitle}>📋 Purchase Order</h2>
    <div style={styles.infoGrid}>
      <div>
        <span style={styles.label}>PO Number</span>
        <span style={styles.value}>{data.buyer_po_number}</span>
      </div>
      <div>
        <span style={styles.label}>Order Date</span>
        <span style={styles.value}>{formatDate(data.order_date)}</span>
      </div>
      <div>
        <span style={styles.label}>Currency</span>
        <span style={styles.value}>{data.currency}</span>
      </div>
      <div>
        <span style={styles.label}>Total Value</span>
        <span style={styles.valueHighlight}>
          {data.currency} {data.value_of_goods.toLocaleString()}
        </span>
      </div>
    </div>
  </div>
);

// Buyer
const BuyerInfo = ({ data }) => (
  <div style={styles.card}>
    <h3>🏢 Buyer</h3>
    <p><b>Company:</b> {data.buyer_company}</p>
    <p><b>Contact:</b> {data.buyer_contact}</p>
    <p><b>Email:</b> {data.buyer_email}</p>
  </div>
);

// Vendor
const VendorInfo = ({ data }) => (
  <div style={styles.card}>
    <h3>🏭 Vendor</h3>
    <p><b>Company:</b> {data.vendor_company}</p>
    <p><b>Address:</b> {data.vendor_address}</p>
  </div>
);

// Line Items
const LineItemsTable = ({ items, currency }) => {
  const total = items.reduce(
    (sum, item) => sum + (parseFloat(item.line_total) || 0),
    0
  );

  return (
    <div style={styles.card}>
      <h3>📦 Line Items</h3>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th>SKU</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Discount %</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.vendor_sku}</td>
              <td>{item.description}</td>
              <td>{item.qty}</td>
              <td>{item.unit_price}</td>
              <td>{item.discount_percent}</td>
              <td>{item.line_total}</td>
            </tr>
          ))}
          <tr style={styles.totalRow}>
            <td colSpan="5">Grand Total</td>
            <td>{currency} {total.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Layout
const Layout = ({ data }) => (
  <div style={styles.container}>
    <PDFViewer pdfUrl={data.pdfUrl} />
    <div style={styles.right}>
      <POHeader data={data} />
      <BuyerInfo data={data} />
      <VendorInfo data={data} />
      <LineItemsTable items={data.items} currency={data.currency} />
    </div>
  </div>
);

// ================= MAIN =================

export default function PoViewer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const mockData = {
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
    };

    setTimeout(() => {
      setData(mockData);
    }, 500); // simulate loading
  }, []);

  if (!data) return <LoadingSpinner />;

  return <Layout data={data} />;
}

// ================= STYLES =================

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  pdfContainer: {
    width: "50%",
    borderRight: "1px solid #ddd",
  },
  pdfHeader: {
    background: "#2c3e50",
    color: "#fff",
    padding: "10px",
  },
  pdfIframe: {
    width: "100%",
    height: "calc(100% - 40px)",
    border: "none",
  },
  right: {
    width: "50%",
    padding: "15px",
    overflowY: "auto",
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "6px",
  },
  sectionTitle: {
    marginBottom: "10px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  label: {
    fontSize: "12px",
    color: "#888",
  },
  value: {
    display: "block",
  },
  valueHighlight: {
    color: "red",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    background: "#333",
    color: "#fff",
  },
  totalRow: {
    fontWeight: "bold",
    background: "#eee",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #ccc",
    borderTop: "4px solid blue",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};