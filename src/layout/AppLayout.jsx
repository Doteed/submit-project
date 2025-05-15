import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const AppLayout = ({ children, pageHeader }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfaf5] font-serif text-gray-800">
      {/* pageHeader가 있으면 Header 숨김 */}
      {pageHeader ? pageHeader : <Header />}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
