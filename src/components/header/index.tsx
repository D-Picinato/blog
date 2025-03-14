import User from './components/user';

export default function Header() {
  return (
    <header className="flex gap-4 justify-between items-center rounded-lg bg-gray-900 p-4 border border-gray-800">
      <div className="flex flex-col px-4">
        <h3>Blog de Programação Web</h3>
        <p className="text-sm text-gray-500">
          Posts focados em desenvolvimento web
        </p>
      </div>
      <User />
    </header>
  );
}
