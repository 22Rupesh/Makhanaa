export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="animate-pulse">
        <div className="h-12 bg-[#E5DDD5] rounded mb-4 w-3/4"></div>
        <div className="h-6 bg-[#E5DDD5] rounded mb-12 w-1/2"></div>
        
        <div className="grid grid-cols-4 gap-4 mb-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-[#E5DDD5] rounded"></div>
          ))}
        </div>

        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-[#E5DDD5] rounded"></div>
          ))}
        </div>
      </div>
    </main>
  );
}
