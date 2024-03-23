import dynamic from "next/dynamic";
const Main = dynamic(() => import("@components/Main"), {
	loading: () => null,
	ssr: false,
});

export default function Home() {
  return (
    <Main/>
  );
}
