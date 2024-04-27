import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <p>Page not found</p>
      </div>
      <div>
        <button>
          <Link to={"/"}>Go to the home page</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
