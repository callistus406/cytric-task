import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import Layout from "../components/layout";
// import Loader from "../components/loader.comp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@/styles/globals.css";
import Loader from "@/components/loader.comp";
import Layout from "@/components/layout.comp";
import { AuthProvider } from "@/components/context/authProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router]);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>

        <Layout title="Ukaobasi Callistus">
          {loading ? <Loader /> : <Component {...pageProps} />}
        <ToastContainer />
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}
