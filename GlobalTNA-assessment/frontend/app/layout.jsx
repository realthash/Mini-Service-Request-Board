import './globals.css';

export const metadata = {
  title: 'GlobalTNA Service Board',
  description: 'Post and browse home service requests',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}