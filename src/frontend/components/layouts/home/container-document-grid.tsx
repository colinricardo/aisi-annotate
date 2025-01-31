export const ContainerDocumentGrid = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col h-full pb-4 outline-none" tabIndex={-1}>
      <div className="w-full flex justify-center" tabIndex={-1}>
        {children}
      </div>
    </div>
  );
};
