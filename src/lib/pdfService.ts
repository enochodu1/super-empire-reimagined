import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

interface InvoiceData {
  orderId: string;
  orderDate: string;
  customerName: string;
  businessName?: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZip: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  specialInstructions?: string;
}

export const generateInvoicePDF = (data: InvoiceData): jsPDF => {
  const doc = new jsPDF();

  // Company Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('SUPER EMPIRE PRODUCE', 105, 20, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('2424 S Cesar Chavez Blvd, Dallas, TX 75215', 105, 28, { align: 'center' });
  doc.text('Phone: (469) 432-9313 | USDOT #4210131', 105, 33, { align: 'center' });

  // Invoice Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 20, 50);

  // Invoice Details (Left Column)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice #: ${data.orderId}`, 20, 60);
  doc.text(`Date: ${format(new Date(data.orderDate), 'MMM dd, yyyy')}`, 20, 66);

  // Customer Details (Right Column)
  doc.setFont('helvetica', 'bold');
  doc.text('BILL TO:', 120, 50);
  doc.setFont('helvetica', 'normal');

  let yPos = 56;
  if (data.businessName) {
    doc.text(data.businessName, 120, yPos);
    yPos += 6;
  }
  doc.text(data.customerName, 120, yPos);
  yPos += 6;
  doc.text(data.email, 120, yPos);
  yPos += 6;
  doc.text(data.phone, 120, yPos);

  // Delivery Address (Right Column continued)
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('DELIVER TO:', 120, yPos);
  yPos += 6;
  doc.setFont('helvetica', 'normal');
  doc.text(data.deliveryAddress, 120, yPos);
  yPos += 6;
  doc.text(`${data.deliveryCity}, ${data.deliveryState} ${data.deliveryZip}`, 120, yPos);

  // Items Table
  const tableStartY = 95;

  autoTable(doc, {
    startY: tableStartY,
    head: [['Item', 'Quantity', 'Unit Price', 'Subtotal']],
    body: data.items.map(item => [
      item.name,
      item.quantity.toString(),
      `$${item.price.toFixed(2)}`,
      `$${item.subtotal.toFixed(2)}`,
    ]),
    theme: 'grid',
    headStyles: {
      fillColor: [34, 139, 34], // Green color
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 35, halign: 'right' },
      3: { cellWidth: 35, halign: 'right' },
    },
  });

  // Calculate position for totals (after table)
  const finalY = (doc as any).lastAutoTable.finalY + 10;

  // Totals Section
  const totalsX = 130;
  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal:', totalsX, finalY);
  doc.text(`$${data.subtotal.toFixed(2)}`, 180, finalY, { align: 'right' });

  doc.text('Tax:', totalsX, finalY + 6);
  doc.text(`$${data.tax.toFixed(2)}`, 180, finalY + 6, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Total:', totalsX, finalY + 14);
  doc.text(`$${data.total.toFixed(2)}`, 180, finalY + 14, { align: 'right' });

  // Special Instructions (if any)
  if (data.specialInstructions) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Special Instructions:', 20, finalY + 30);
    doc.setFont('helvetica', 'normal');
    const splitInstructions = doc.splitTextToSize(data.specialInstructions, 170);
    doc.text(splitInstructions, 20, finalY + 36);
  }

  // Footer
  const footerY = 270;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('Thank you for your business!', 105, footerY, { align: 'center' });
  doc.text('Questions? Contact us at (469) 432-9313 or info@superempireproduce.com', 105, footerY + 5, { align: 'center' });

  return doc;
};

export const downloadInvoice = (data: InvoiceData) => {
  const doc = generateInvoicePDF(data);
  doc.save(`invoice-${data.orderId}.pdf`);
};

export const printInvoice = (data: InvoiceData) => {
  const doc = generateInvoicePDF(data);
  doc.autoPrint();
  window.open(doc.output('bloburl'), '_blank');
};

// Generate packing slip (similar to invoice but without prices)
export const generatePackingSlipPDF = (data: InvoiceData): jsPDF => {
  const doc = new jsPDF();

  // Company Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('SUPER EMPIRE PRODUCE', 105, 20, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('2424 S Cesar Chavez Blvd, Dallas, TX 75215', 105, 28, { align: 'center' });

  // Packing Slip Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('PACKING SLIP', 20, 50);

  // Order Details
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Order #: ${data.orderId}`, 20, 60);
  doc.text(`Date: ${format(new Date(data.orderDate), 'MMM dd, yyyy')}`, 20, 66);

  // Delivery Address
  doc.setFont('helvetica', 'bold');
  doc.text('DELIVER TO:', 20, 80);
  doc.setFont('helvetica', 'normal');
  if (data.businessName) {
    doc.text(data.businessName, 20, 86);
    doc.text(data.customerName, 20, 92);
    doc.text(data.deliveryAddress, 20, 98);
    doc.text(`${data.deliveryCity}, ${data.deliveryState} ${data.deliveryZip}`, 20, 104);
    doc.text(data.phone, 20, 110);
  } else {
    doc.text(data.customerName, 20, 86);
    doc.text(data.deliveryAddress, 20, 92);
    doc.text(`${data.deliveryCity}, ${data.deliveryState} ${data.deliveryZip}`, 20, 98);
    doc.text(data.phone, 20, 104);
  }

  // Items Table (without prices)
  autoTable(doc, {
    startY: 120,
    head: [['Item', 'Quantity', 'Packed ☐']],
    body: data.items.map(item => [
      item.name,
      item.quantity.toString(),
      '', // Checkbox for warehouse staff
    ]),
    theme: 'grid',
    headStyles: {
      fillColor: [34, 139, 34],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 40, halign: 'center' },
      2: { cellWidth: 40, halign: 'center' },
    },
  });

  return doc;
};

export const downloadPackingSlip = (data: InvoiceData) => {
  const doc = generatePackingSlipPDF(data);
  doc.save(`packing-slip-${data.orderId}.pdf`);
};
