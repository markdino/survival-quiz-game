import { metadata } from "@app/layout";
import CreateRoomButton from "@components/CreateRoomButton";
import Divider from "@components/Divider";
import JoinField from "@components/JoinField";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <section>Home page</section>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8">
          {metadata?.title}
        </h1>
        <section>
          <JoinField />
          <Divider text="or" className="max-w-md mx-auto" />
          <CreateRoomButton />
        </section>
      </div>
    </main>
  );
}
