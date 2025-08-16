"use client";
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image-more";

const BingoCardDisplay = ({ cards }) => {
  const containerRef = useRef();

  console.log("Requested cards:", cards.length);
  //   const exportPDF = async () => {
  //     const pdf = new jsPDF();
  //     const cardElements = containerRef.current.querySelectorAll(".bingo-card");

  //     for (let i = 0; i < cardElements.length; i++) {
  //       const canvas = await html2canvas(cardElements[i], {
  //         scale: 2,
  //         useCORS: true,
  //         logging: false,
  //       });
  //       const imgData = canvas.toDataURL("image/png");
  //       const imgProps = pdf.getImageProperties(imgData);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //       if (i > 0) pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     }

  //     pdf.save("bingo-cards.pdf");
  //   };

  const exportPDF = async () => {
    // const pdf = new jsPDF();
    // const cardElements = containerRef.current.querySelectorAll(".bingo-card");

    // for (let i = 0; i < cardElements.length; i++) {
    //   const dataUrl = await domtoimage.toPng(cardElements[i], {
    //     quality: 1,
    //     cacheBust: true,
    //     bgcolor: "#ffffff",
    //     width: cardElements[i].scrollWidth,
    //     height: cardElements[i].scrollHeight,
    //   });

    //   const imgProps = pdf.getImageProperties(dataUrl);
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    //   if (i > 0) pdf.addPage();
    //   pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    // }

    // pdf.save("bingo-cards.pdf");
    const pdf = new jsPDF();
    const cardElements = containerRef.current.querySelectorAll(".bingo-card");

    for (let i = 0; i < cardElements.length; i++) {
      const dataUrl = await domtoimage.toPng(cardElements[i], {
        quality: 1,
        cacheBust: true,
        bgcolor: "#ffffff",
        width: cardElements[i].scrollWidth,
        height: cardElements[i].scrollHeight,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // ✅ Define fixed width for bingo card in PDF (make columns wider)
      const cardWidth = pageWidth * 1.2; // 90% of page width
      const cardHeight = cardWidth; // make it square (columns look even)

      // Center the card in the page
      const x = (pageWidth - cardWidth) / 2;
      const y = (pageHeight - cardHeight) / 2;

      if (i > 0) pdf.addPage();
      pdf.addImage(dataUrl, "PNG", x, y, cardWidth, cardHeight);

      // ✅ Add control number (Upper Left Corner)
      const controlNumber = `PCSA125-${String(i + 1).padStart(4, "0")}`;
      pdf.setFontSize(12);
      pdf.text(controlNumber, 10, 15); // (x, y) => 10 from left, 15 from top
    }

    pdf.save("bingo-cards.pdf");
  };

  return (
    <div>
      <div ref={containerRef}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bingo-card"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "800px",
              padding: "40px",
              pageBreakAfter: "always",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                width: "80%",
                height: "80%",
                fontSize: "24px",
                textAlign: "center",
                color: "black", // ensure font color is black
              }}
            >
              <thead>
                <tr>
                  {["B", "I", "N", "G", "O"].map((letter) => (
                    <th
                      key={letter}
                      style={{
                        border: "2px solid black",
                        padding: "10px",
                        color: "black",
                      }}
                    >
                      {letter}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {card.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((num, cIdx) => (
                      <td
                        key={cIdx}
                        style={{
                          border: "1px solid black",
                          padding: "15px",
                          backgroundColor: num === "FREE" ? "#e0e0e0" : "white",
                          color: "black",
                        }}
                      >
                        {num}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* PDF download button */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <button
          onClick={exportPDF}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default BingoCardDisplay;
