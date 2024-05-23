function Footer() {
  return (
    <div className="flex justify-center items-center w-full h-16 bg-gradient-to-b from-red-50 to-red-600">
      <button className="bg-gray-100  rounded-md h-10 w-10 flex justify-center items-center hover:shadow-md hover:bg-red-100">
        <a href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 text-red-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 18.75 7.5-7.5 7.5 7.5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </a>
      </button>
    </div>
  );
}

export default Footer;
