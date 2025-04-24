import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Delicious Recipes :)</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4 flex-grow">{children}</main>
      <footer className="bg-gray-200 text-gray-700 py-4 mt-8">
        {" "}
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">Delicious Recipes App</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
