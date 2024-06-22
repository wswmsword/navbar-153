import Docs from "@/components/docs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CenterBox from "@/components/center-box";

export default function Home() {
  return <>
    <Header />
    <CenterBox>
      <Docs />
      <Footer />
    </CenterBox>
  </>;
}
