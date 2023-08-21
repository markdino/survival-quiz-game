import { metadata } from "@app/layout";
import CreateRoomButton from "@components/CreateRoomButton";
import Divider from "@components/Divider";
import JoinField from "@components/JoinField";
import mainBg from "@assets/images/main-bg.jpg";
import Glass from "@components/Glass";
import Divider2 from "@components/Divider2";

export default function Home() {
  const mainStyle = {
    backgroundImage: `url('${mainBg.src}')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };
  return (
    <main
      style={mainStyle}
      className="flex min_h_occupied flex-col items-center p-24"
    >
      {/* <section>Home page</section> */}
      <div className="text-center">
        <section className="py-6 px-8 border-8 rounded-2xl border-yellow-950 border-double bg-yellow-700 mb-8">
          <h1
            className="text-4xl font-bold tracking-tight text-slate-100 sm:text-6xl text_stroke"
            // style={{ color: "#513493" }}
          >
            {metadata?.title}
          </h1>
        </section>
        <Glass className="p-20 mx-auto max-w-fit">
          <JoinField />
          <Divider2 text="or" className="max-w-md mx-auto py-4" />
          <CreateRoomButton />
        </Glass>
      </div>
    </main>
  );
}
