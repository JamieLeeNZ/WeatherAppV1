import React from "react";

function Footer() {
  return (
    <div className="border-t py-3 flex justify-center items-center fixed bottom-0 w-full">
      <hr></hr>
      <p className="text-center text-sm">
        <a
          href="https://github.com/eejl773"
          className="mx-4 text-blue-400 hover:text-blue-600"
        >
          Github
        </a>
        &emsp;© 2023 Jamie Lee&emsp;
        <a
          href="https://www.linkedin.com/in/jamie-lee-24b161197/"
          className="mx-4 text-blue-400 hover:text-blue-600"
        >
          LinkedIn
        </a>
      </p>
    </div>
  );
}

export default Footer;
