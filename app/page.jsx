"use client";
import useFetchData from "./useFetchData";
// const fetchData = async () => {

//   const response = await fetch("https://dummyjson.com/comments");
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// };

export default function Home() {
  const {
    sorting,
    pagination,
    pageNumber,
    refresh,
    searching,
    prevButton,
    nextButton,
    generatePaginationNumbers,
    slicedData,
    isLoading,
    totalPages,
    isError,
    error,
  } = useFetchData("https://dummyjson.com/comments", 5);
  // const [pageNumber, setPageNumber] = useState(1);
  // const { data, isLoading, isError, error, refetch } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: fetchData,
  // });

  // const itemsPerPage = 5;
  // const totalItems = data?.comments?.length || 0;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // const startIndex = (pageNumber - 1) * itemsPerPage;
  // const slicedData = data?.comments?.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );
  // const sortById = () => {
  //   slicedData.sort((a, b) => a.id - b.id);
  //   setPageNumber(1);
  // };
  // const handlesearch = () => {
  //   return console.log("searching");
  // };

  // const nextPage = () => setPageNumber(pageNumber + 1);
  // const prevPage = () => setPageNumber(pageNumber - 1);
  // const handleRefresh = () => {
  //   refetch();
  //   setPageNumber(1);
  // };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  // Helper function to generate pagination numbers
  // const generatePaginationNumbers = () => {
  //   const paginationNumbers = [];
  //   const maxVisiblePages = 2; // Maximum number of visible page numbers
  //   const minPage = 1; // Minimum page number

  //   if (totalPages <= maxVisiblePages) {
  //     // Case 1: Less than or equal to 3 pages
  //     for (let i = minPage; i <= totalPages; i++) {
  //       paginationNumbers.push(
  //         <button
  //           key={i}
  //           onClick={() => setPageNumber(i)}
  //           disabled={pageNumber === i}
  //         >
  //           {i}
  //         </button>
  //       );
  //     }
  //   } else if (pageNumber <= maxVisiblePages) {
  //     // Case 2: Near the beginning
  //     for (let i = minPage; i <= maxVisiblePages; i++) {
  //       paginationNumbers.push(
  //         <button
  //           key={i}
  //           onClick={() => setPageNumber(i)}
  //           disabled={pageNumber === i}
  //         >
  //           {i}
  //         </button>
  //       );
  //     }
  //     paginationNumbers.push(<span key="ellipsis">...</span>);
  //     paginationNumbers.push(
  //       <button
  //         key={totalPages}
  //         onClick={() => setPageNumber(totalPages)}
  //         disabled={pageNumber === totalPages}
  //       >
  //         {totalPages}
  //       </button>
  //     );
  //   } else if (pageNumber >= totalPages - maxVisiblePages + 1) {
  //     // Case 3: Near the end
  //     paginationNumbers.push(
  //       <button
  //         key={minPage}
  //         onClick={() => setPageNumber(minPage)}
  //         disabled={pageNumber === minPage}
  //       >
  //         {minPage}
  //       </button>
  //     );
  //     paginationNumbers.push(<span key="ellipsis">...</span>);
  //     for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
  //       paginationNumbers.push(
  //         <button
  //           key={i}
  //           onClick={() => setPageNumber(i)}
  //           disabled={pageNumber === i}
  //         >
  //           {i}
  //         </button>
  //       );
  //     }
  //   } else {
  //     // Case 4: Middle
  //     paginationNumbers.push(
  //       <button
  //         key={minPage}
  //         onClick={() => setPageNumber(minPage)}
  //         disabled={pageNumber === minPage}
  //       >
  //         {minPage}
  //       </button>
  //     );
  //     paginationNumbers.push(<span key="ellipsis1">...</span>);
  //     for (let i = pageNumber - 1; i <= pageNumber + 1; i++) {
  //       paginationNumbers.push(
  //         <button
  //           key={i}
  //           onClick={() => setPageNumber(i)}
  //           disabled={pageNumber === i}
  //         >
  //           {i}
  //         </button>
  //       );
  //     }
  //     paginationNumbers.push(<span key="ellipsis2">...</span>);
  //     paginationNumbers.push(
  //       <button
  //         key={totalPages}
  //         onClick={() => setPageNumber(totalPages)}
  //         disabled={pageNumber === totalPages}
  //       >
  //         {totalPages}
  //       </button>
  //     );
  //   }

  //   return paginationNumbers;
  // };
  return (
    <>
      <button onClick={refresh}>refresh</button>
      <button onClick={sorting} className="ml-5">
        sort
      </button>
      <input type="text" onChange={searching} />
      <div className="mb-5">
        {slicedData?.map((comment) => (
          <div key={comment.id} className="border border-white mb-5">
            <p>{comment.id}</p>

            <p>{comment.body}</p>
            <p>Posted by: {comment.user.username}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        {/* <div>Showing 1–5 of {data?.comments?.length} results</div> */}
        {/* <div>
          Showing {pageNumber * 5 - 4}–
          {Math.min(pageNumber * 5, slicedData.length)} of{" "}
          {data?.comments?.length} results
        </div> */}
        <div className="flex gap-3">
          <button onClick={prevButton} disabled={pageNumber === 1}>
            Previous Page
          </button>
          {generatePaginationNumbers()}
          <button onClick={nextButton} disabled={pageNumber === totalPages}>
            Next Page
          </button>
        </div>
      </div>
    </>
  );
}
