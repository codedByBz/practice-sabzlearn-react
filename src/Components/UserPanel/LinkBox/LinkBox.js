import React from "react";
import { Link } from "react-router-dom";

function LinkBox({ title, href }) {
  return (
    <>
      <div class="col-4">
        <Link to={href} class="main__link">
          {title}
        </Link>
      </div>
    </>
  );
}

export default LinkBox;
