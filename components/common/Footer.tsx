export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {currentYear} TourismBooking. All rights reserved.</p>
        <p className="text-sm mt-1">
          Your adventure starts here. Explore the world with us!
        </p>
        <div className="mt-4">
          <a href="#" className="text-gray-400 hover:text-white mx-2">Facebook</a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">Instagram</a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">Twitter</a>
        </div>
      </div>
    </footer>
  );
}