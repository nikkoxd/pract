import TableCell from "./components/TableCell";
import TableHeader from "./components/TableHeader";
import Sidebar from "./sidebar";

export default function Home() {
  return (
    <main className="container mx-auto grid grid-cols-4 gap-4">
      <Sidebar />
      <section className="col-span-3 bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
        <h1 className="text-2xl font-bold">Базы данных - Б22-191-1</h1>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <TableHeader>ФИО Участника</TableHeader>
              <TableHeader>1</TableHeader>
              <TableHeader>2</TableHeader>
              <TableHeader>3</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>Иванов Иван Иванович</TableCell>
              <TableCell>+</TableCell>
              <TableCell>+</TableCell>
              <TableCell>+</TableCell>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
