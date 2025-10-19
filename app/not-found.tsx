import Link from "@/components/Link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center space-y-6 max-w-md mx-auto px-6">
        <div className="space-y-4">
          <h1 className="text-8xl">404</h1>
          <p className="text-2xl font-bold text-black">
            Strona nie została znaleziona
          </p>
          <p className="text-gray-600 mt-2">
            Przepraszamy, ale strona, której szukasz, nie istnieje lub została
            przeniesiona.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/" variant="fill" className="inline-block">
            Powrót do strony głównej
          </Link>
        </div>
      </div>
    </div>
  );
}
