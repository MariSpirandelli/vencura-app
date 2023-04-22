import { DynamicWidget } from '@dynamic-labs/sdk-react';

const Header: React.FC = () => {
  return (
    <header className="bg-black border-b border-gray-200 p-4 mx-auto flex items-right justify-end">
      <div className="max-w-fit">
        <DynamicWidget />
      </div>
    </header>
  );
};

export default Header;
