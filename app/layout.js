import './globals.css';

export const metadata = {
  title: 'Real Estate | Property in India | Buy, Sale, Rent | Real Estate Guru',
  description: 'Properties for the Global Indian! Buy, Sell & Rent - Flats, Houses, Villas, Plots across India',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
