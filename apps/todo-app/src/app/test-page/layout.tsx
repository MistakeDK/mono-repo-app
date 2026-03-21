import { PropsWithChildren } from 'react';

const TestPageLayout = ({ children }: PropsWithChildren) => {
  return <div className="w-screen h-screen">{children}</div>;
};
export default TestPageLayout;
