import Link from "./Link";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="min-h-64 bg-gray-200 mt-8 border-t-3 border-red-600">
      <div className="flex flex-col md:flex-row p-3 gap-3">
        {siteConfig.footer.map((group) => (
          <div key={group.title} className="flex-1 px-6 pt-3">
            <div>
              <div className="mb-3 text-xl font-bold text-black">
                {group.title}
              </div>
              {group.content.map((item) => (
                <div key={item.name} className="mb-2">
                  <Link
                    href={item.link}
                    variant="bottom-line"
                    className="text-black"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex-1 px-6 pt-3">
          <div>
            <div className="mb-3 text-xl font-bold text-black">
              Social media
            </div>
            {siteConfig.social.map((item) => (
              <div key={item.name} className="mb-2">
                <Link
                  href={item.link}
                  variant="bottom-line"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center font-bold mx-auto py-4 text-black">
        © REDARK.pl - Wszelkie prawa zastrzeżone
      </div>
    </footer>
  );
}
