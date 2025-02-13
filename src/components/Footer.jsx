import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-2 fixed bottom-0 left-0 w-full">
      <div className="container mx-auto flex flex-col items-center space-y-2">
        <div className="flex space-x-6">
          <a
            href="https://github.com/MohammedSobhi606"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://www.linkedin.com/in/mohammed-sobhi-gouda-a62284271"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200"
          >
            <FaLinkedin size={30} />
          </a>
          {/* about page */}
          <Link
            href={"/about"}
            className="shadow-md     hover:scale-105  active:scale-95 transition-all ease-in-out border rounded-md p-1"
          >
            about me👋{" "}
          </Link>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Mohammed Sobhi. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
