'use client';
export interface PaginationProps {
    totalPages: number;
     currentPage: number ;
    setPage:(data:number)=>void
}
export default function Pagination({ totalPages, currentPage , setPage }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center">
    <div className="inline-flex  mt-5 ">
 

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
           className={`px-4 py-2 text-lg m-3 w-13 h-13 rounded-md font-medium ${
            currentPage === page
              ? 'bg-gray-400 text-white'
              : 'text-gray-700 bg-gray-100 border  border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      
    </div>
    </div>
  );
}

 