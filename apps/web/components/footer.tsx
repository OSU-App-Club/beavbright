import { Icons } from "./icons";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a href="/" className="font-bold text-xl flex items-center">
            <Icons.logo />
            <span className="ml-1">BeavBright</span>
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Social Media</h3>
          <div>
            <a
              href="https://github.com/OSU-App-Club"
              className="opacity-60 hover:opacity-100"
            >
              Github
            </a>
          </div>

          <div>
            <a
              href="https://www.instagram.com/osuappclub/"
              className="opacity-60 hover:opacity-100"
            >
              Instagram
            </a>
          </div>
          <div>
            <a
              href="https://discord.gg/eae2rdQDPA"
              className="opacity-60 hover:opacity-100"
            >
              Discord
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">BeavBright</h3>
          <div>
            <a href="#about" className="opacity-60 hover:opacity-100">
              About
            </a>
          </div>

          <div>
            <a href="#home" className="opacity-60 hover:opacity-100">
              Back To Top
            </a>
          </div>

          <div>
            <a href="#faq" className="opacity-60 hover:opacity-100">
              FAQ
            </a>
          </div>
        </div>
      </section>
      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024 BeavBright. Designed by{" "}
          <a
            target="_blank"
            href="https://osuapp.club"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            the OSU App Club
          </a>
        </h3>
      </section>
    </footer>
  );
};
