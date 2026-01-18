import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <div className="md:pt-16">
          <Header />
          <main className="md:mt-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
