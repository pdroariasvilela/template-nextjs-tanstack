import { Navbar } from "@/components";
import { CharacterTable } from "@/features/character/components/character-table";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <CharacterTable />
    </div>
  );
}
