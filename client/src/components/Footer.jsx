import { Footer } from "flowbite-react";
import {
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <Footer container className=" border border-t-8 border-purple-500">
      <div className=" w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className=" mt-5">
            <Link
              to="/"
              className=" self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className=" px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Mandeep's
              </span>{" "}
              Blog
            </Link>
          </div>
          <div className=" grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/tech7msjhass"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  My Projects
                </Footer.Link>

                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mandeep"s Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Me" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.linkedin.com/in/mandeep-singh-19394728b/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>

                <Footer.Link
                  href="https://www.instagram.com/diljit5555.ds/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>

                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className=" w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Mandeep's Blog"
            year={new Date().getFullYear()}
          />
          <div className=" flex gap-6 mt-4 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={FaFacebook} />
            <Footer.Icon
              target="_blank"
              href="https://www.instagram.com/diljit5555.ds/"
              icon={FaInstagram}
            />
            <Footer.Icon
              target="_blank"
              href="https://x.com/TechMsjhass"
              icon={FaTwitter}
            />
            <Footer.Icon
              target="_blank"
              href="https://github.com/tech7msjhass"
              icon={FaGithub}
            />
            <Footer.Icon href="#" icon={FaDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
