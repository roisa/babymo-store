export default function Loading() {
  return (
    <div className="container-soft py-12">
      <div className="skeleton mb-4 h-10 w-2/3" />
      <div className="skeleton mb-8 h-4 w-1/3" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton aspect-square" />
        ))}
      </div>
    </div>
  );
}
