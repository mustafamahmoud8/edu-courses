const Loading = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center h-screen bg-background/80 backdrop-blur-sm">
      <div className="loader animate-load" />
    </div>
  );
};

export default Loading;
