import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <span className="text-yellow-500 font-mono text-sm tracking-widest block mb-4">
          /// ERROR_404
        </span>
        <h1 className="text-[20vw] leading-none font-serif italic text-white mb-8">
          404
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block border border-white/20 text-white font-mono text-sm uppercase py-4 px-8 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300"
        >
          Return to Base →
        </Link>
      </div>
    </div>
  );
}
