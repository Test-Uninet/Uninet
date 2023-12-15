import Sidebar from './sidebar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      <div className="flex shadow-lg flex-col">
        <Sidebar />
      </div>
      <div className=" h-full w-full flex flex-col">
        <div className="flex-1 flex-grow overflow-y-auto w-full bg-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
