import PDFDocument from 'pdfkit';
import { PricingEstimate } from '@/types/pricing';

/**
 * Generate a professional PDF estimate document
 * Returns a Promise that resolves with the PDF buffer
 */
export async function generateEstimatePDF(
  estimate: PricingEstimate
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Create PDF document
      const doc = new PDFDocument({
        size: 'LETTER',
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
        info: {
          Title: `Estimate ${estimate.id.substring(0, 8)}`,
          Author: 'IITDeveloper',
          Subject: 'Project Estimate',
          Keywords: 'estimate, quote, pricing',
        },
      });

      const chunks: Buffer[] = [];

      // Collect PDF data
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Colors
      const colors = {
        primary: '#00539C', // Royal blue
        secondary: '#FFD662', // Yellow beige
        dark: '#0a0a0a',
        gray: '#888888',
        lightGray: '#cccccc',
        white: '#ffffff',
      };

      let yPosition = 50;

      // ================================
      // HEADER SECTION
      // ================================
      
      // Company name with gradient effect (simulated with color)
      doc
        .fontSize(32)
        .fillColor(colors.primary)
        .font('Helvetica-Bold')
        .text('IITDeveloper', 50, yPosition);

      yPosition += 40;

      doc
        .fontSize(10)
        .fillColor(colors.gray)
        .font('Helvetica')
        .text('Premium Software Development & AI Solutions', 50, yPosition);

      yPosition += 30;

      // Horizontal line
      doc
        .strokeColor(colors.lightGray)
        .lineWidth(1)
        .moveTo(50, yPosition)
        .lineTo(562, yPosition)
        .stroke();

      yPosition += 30;

      // ================================
      // ESTIMATE DETAILS
      // ================================

      // "ESTIMATE" title
      doc
        .fontSize(24)
        .fillColor(colors.dark)
        .font('Helvetica-Bold')
        .text('PROJECT ESTIMATE', 50, yPosition);

      // Estimate metadata (right-aligned)
      const metadataX = 400;
      doc
        .fontSize(10)
        .fillColor(colors.gray)
        .font('Helvetica')
        .text('Estimate ID:', metadataX, yPosition, { width: 80, align: 'right' });

      doc
        .fillColor(colors.dark)
        .font('Helvetica-Bold')
        .text(estimate.id.substring(0, 8).toUpperCase(), metadataX + 85, yPosition);

      yPosition += 20;

      doc
        .fillColor(colors.gray)
        .font('Helvetica')
        .text('Date:', metadataX, yPosition, { width: 80, align: 'right' });

      doc
        .fillColor(colors.dark)
        .font('Helvetica')
        .text(
          new Date(estimate.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
          metadataX + 85,
          yPosition
        );

      if (estimate.validUntil) {
        yPosition += 20;

        doc
          .fillColor(colors.gray)
          .font('Helvetica')
          .text('Valid Until:', metadataX, yPosition, { width: 80, align: 'right' });

        doc
          .fillColor(colors.dark)
          .font('Helvetica')
          .text(
            new Date(estimate.validUntil).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
            metadataX + 85,
            yPosition
          );
      }

      yPosition += 40;

      // ================================
      // CUSTOMER INFORMATION
      // ================================

      if (estimate.customerInfo) {
        doc
          .fontSize(12)
          .fillColor(colors.dark)
          .font('Helvetica-Bold')
          .text('PREPARED FOR:', 50, yPosition);

        yPosition += 20;

        doc
          .fontSize(10)
          .fillColor(colors.dark)
          .font('Helvetica')
          .text(estimate.customerInfo.name, 50, yPosition);

        yPosition += 15;

        doc
          .fillColor(colors.gray)
          .text(estimate.customerInfo.email, 50, yPosition);

        if (estimate.customerInfo.company) {
          yPosition += 15;
          doc.text(estimate.customerInfo.company, 50, yPosition);
        }

        if (estimate.customerInfo.phone) {
          yPosition += 15;
          doc.text(estimate.customerInfo.phone, 50, yPosition);
        }

        yPosition += 30;
      }

      // ================================
      // LINE ITEMS TABLE
      // ================================

      // Table header
      const tableTop = yPosition;
      const tableLeft = 50;
      const col1Width = 30; // #
      const col2Width = 250; // Service
      const col3Width = 80; // Quantity
      const col4Width = 100; // Price

      // Header background (light gray box)
      doc
        .rect(tableLeft, tableTop, 512, 25)
        .fillColor('#f5f5f5')
        .fill();

      // Header text
      doc
        .fontSize(10)
        .fillColor(colors.dark)
        .font('Helvetica-Bold')
        .text('#', tableLeft + 5, tableTop + 8, { width: col1Width });

      doc.text('SERVICE', tableLeft + col1Width + 5, tableTop + 8, {
        width: col2Width,
      });

      doc.text('QUANTITY', tableLeft + col1Width + col2Width + 5, tableTop + 8, {
        width: col3Width,
      });

      doc.text('AMOUNT', tableLeft + col1Width + col2Width + col3Width + 5, tableTop + 8, {
        width: col4Width,
        align: 'right',
      });

      yPosition = tableTop + 35;

      // Line items
      estimate.lineItems.forEach((item, index) => {
        // Check if we need a new page
        if (yPosition > 700) {
          doc.addPage();
          yPosition = 50;
        }

        // Row background (alternating)
        if (index % 2 === 0) {
          doc
            .rect(tableLeft, yPosition - 5, 512, 30)
            .fillColor('#fafafa')
            .fill();
        }

        // Item number
        doc
          .fontSize(9)
          .fillColor(colors.gray)
          .font('Helvetica')
          .text(`${index + 1}`, tableLeft + 5, yPosition, { width: col1Width });

        // Service name
        doc
          .fontSize(10)
          .fillColor(colors.dark)
          .font('Helvetica-Bold')
          .text(item.serviceName, tableLeft + col1Width + 5, yPosition, {
            width: col2Width - 10,
          });

        // Quantity
        doc
          .fontSize(9)
          .fillColor(colors.gray)
          .font('Helvetica')
          .text(
            `${item.quantity} ${item.unit}`,
            tableLeft + col1Width + col2Width + 5,
            yPosition + 2,
            { width: col3Width }
          );

        // Price
        doc
          .fontSize(11)
          .fillColor(colors.dark)
          .font('Helvetica-Bold')
          .text(
            `$${item.totalPrice.toLocaleString()}`,
            tableLeft + col1Width + col2Width + col3Width + 5,
            yPosition,
            {
              width: col4Width - 10,
              align: 'right',
            }
          );

        yPosition += 35;
      });

      yPosition += 10;

      // Horizontal line before totals
      doc
        .strokeColor(colors.lightGray)
        .lineWidth(1)
        .moveTo(tableLeft, yPosition)
        .lineTo(562, yPosition)
        .stroke();

      yPosition += 20;

      // ================================
      // TOTALS SECTION
      // ================================

      const totalsX = 400;

      // Subtotal
      doc
        .fontSize(10)
        .fillColor(colors.gray)
        .font('Helvetica')
        .text('Subtotal:', totalsX, yPosition, { width: 80, align: 'right' });

      doc
        .fillColor(colors.dark)
        .font('Helvetica')
        .text(`$${estimate.subtotal.toLocaleString()}`, totalsX + 85, yPosition, {
          width: 77,
          align: 'right',
        });

      yPosition += 20;

      // Discount (if applicable)
      if (estimate.discount && estimate.discount.value > 0) {
        const discountAmount = (estimate.subtotal * estimate.discount.value) / 100;

        doc
          .fillColor(colors.gray)
          .font('Helvetica')
          .text(`Discount (${estimate.discount.value}%):`, totalsX, yPosition, {
            width: 80,
            align: 'right',
          });

        doc
          .fillColor('#FFD662')
          .font('Helvetica')
          .text(`-$${discountAmount.toLocaleString()}`, totalsX + 85, yPosition, {
            width: 77,
            align: 'right',
          });

        yPosition += 20;
      }

      // Horizontal line before total
      doc
        .strokeColor(colors.lightGray)
        .lineWidth(1)
        .moveTo(totalsX, yPosition)
        .lineTo(562, yPosition)
        .stroke();

      yPosition += 20;

      // Total
      doc
        .fontSize(14)
        .fillColor(colors.dark)
        .font('Helvetica-Bold')
        .text('TOTAL:', totalsX, yPosition, { width: 80, align: 'right' });

      doc
        .fontSize(18)
        .fillColor(colors.primary)
        .font('Helvetica-Bold')
        .text(`$${estimate.total.toLocaleString()}`, totalsX + 85, yPosition, {
          width: 77,
          align: 'right',
        });

      doc
        .fontSize(8)
        .fillColor(colors.gray)
        .font('Helvetica')
        .text('USD', totalsX + 85, yPosition + 20, { width: 77, align: 'right' });

      yPosition += 60;

      // ================================
      // NOTES SECTION
      // ================================

      if (estimate.customerInfo?.message) {
        // Check if we need a new page
        if (yPosition > 650) {
          doc.addPage();
          yPosition = 50;
        }

        doc
          .fontSize(12)
          .fillColor(colors.dark)
          .font('Helvetica-Bold')
          .text('NOTES:', 50, yPosition);

        yPosition += 20;

        doc
          .fontSize(10)
          .fillColor(colors.gray)
          .font('Helvetica')
          .text(estimate.customerInfo.message, 50, yPosition, {
            width: 512,
            align: 'left',
          });

        yPosition += 40;
      }

      // ================================
      // FOOTER
      // ================================

      // Move to bottom of page
      yPosition = 720;

      // Horizontal line
      doc
        .strokeColor(colors.lightGray)
        .lineWidth(1)
        .moveTo(50, yPosition)
        .lineTo(562, yPosition)
        .stroke();

      yPosition += 15;

      // Footer text
      doc
        .fontSize(9)
        .fillColor(colors.gray)
        .font('Helvetica')
        .text(
          'Thank you for considering IITDeveloper for your project.',
          50,
          yPosition,
          { width: 512, align: 'center' }
        );

      yPosition += 15;

      doc
        .fontSize(8)
        .fillColor(colors.gray)
        .text(
          'This estimate is valid for 30 days from the date of issue. All prices are in USD.',
          50,
          yPosition,
          { width: 512, align: 'center' }
        );

      yPosition += 15;

      doc
        .fontSize(8)
        .fillColor(colors.primary)
        .text('www.iitdeveloper.com • goyalnikhil743@gmail.com', 50, yPosition, {
          width: 512,
          align: 'center',
        });

      // Finalize PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Generate filename for the PDF
 */
export function generatePDFFilename(estimate: PricingEstimate): string {
  const date = new Date(estimate.createdAt)
    .toISOString()
    .split('T')[0]
    .replace(/-/g, '');
  const id = estimate.id.substring(0, 8).toUpperCase();
  return `IITDeveloper-Estimate-${id}-${date}.pdf`;
}
