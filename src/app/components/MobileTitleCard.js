import Link from "next/link";

export default function MobileTitleCard() {
  return(
    <div className="rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
      <div className="p-4 mb-2">
        <h5 className="block text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          CRM
        </h5>
      </div>

      <nav className="flex min-w-[240px] flex-col gap-1 p-2 text-base font-normal text-blue-gray-700">
      <Link href="/">
        <div
          role="button"
          className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 cursor-pointer"
        >
          <div className="grid mr-4 place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-5 h-5"
            >
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" />
            </svg>
          </div>
          Dashboard
        </div>
      </Link>
      {/* Add more links similarly */}
      </nav>
  </div>
  );
}