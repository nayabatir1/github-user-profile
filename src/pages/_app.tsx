import "@/styles/globals.css";
import type { AppProps } from "next/app";
import HeaderNavigation from "../components/navigation/HeaderNavigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-screen bg-white text-black fixed">
        <div className="flex justify-center md:justify-end md:pr-16">
          <HeaderNavigation title="Home" link="/" />
          <HeaderNavigation title="History" link="/history" />
        </div>
        <div className="bg-gray-100 h-screen flex justify-center">
          <Component {...pageProps} />
        </div>
      </div>
    </QueryClientProvider>
  );
}
