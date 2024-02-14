'use client'
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const useFetchData = (endpoint, itemsPerPage) => {
    const [pageNumber, setPageNumber] = useState(1);

    const fetchData = async () => {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    };

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchData,
    });
    const totalItems = data?.comments?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);


    const sortById = () => {
        // Sorting logic here
        slicedData.sort((a, b) => a.id - b.id);
        setPageNumber(1);
    };

    const handleSearch = () => {
        // Search logic here
        return console.log("searching");

    };

    const nextPage = () => setPageNumber(pageNumber + 1);
    const prevPage = () => setPageNumber(pageNumber - 1);

    // Helper function to generate pagination numbers
    const generatePaginationNumbers = () => {
        const paginationNumbers = [];
        const maxVisiblePages = 2; // Maximum number of visible page numbers
        const minPage = 1; // Minimum page number

        if (totalPages <= maxVisiblePages) {
            // Case 1: Less than or equal to 3 pages
            for (let i = minPage; i <= totalPages; i++) {
                paginationNumbers.push(
                    <button
                        key={i}
                        onClick={() => setPageNumber(i)}
                        disabled={pageNumber === i}
                    >
                        {i}
                    </button>
                );
            }
        } else if (pageNumber <= maxVisiblePages) {
            // Case 2: Near the beginning
            for (let i = minPage; i <= maxVisiblePages; i++) {
                paginationNumbers.push(
                    <button
                        key={i}
                        onClick={() => setPageNumber(i)}
                        disabled={pageNumber === i}
                    >
                        {i}
                    </button>
                );
            }
            paginationNumbers.push(<span key="ellipsis">...</span>);
            paginationNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => setPageNumber(totalPages)}
                    disabled={pageNumber === totalPages}
                >
                    {totalPages}
                </button>
            );
        } else if (pageNumber >= totalPages - maxVisiblePages + 1) {
            // Case 3: Near the end
            paginationNumbers.push(
                <button
                    key={minPage}
                    onClick={() => setPageNumber(minPage)}
                    disabled={pageNumber === minPage}
                >
                    {minPage}
                </button>
            );
            paginationNumbers.push(<span key="ellipsis">...</span>);
            for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
                paginationNumbers.push(
                    <button
                        key={i}
                        onClick={() => setPageNumber(i)}
                        disabled={pageNumber === i}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            // Case 4: Middle
            paginationNumbers.push(
                <button
                    key={minPage}
                    onClick={() => setPageNumber(minPage)}
                    disabled={pageNumber === minPage}
                >
                    {minPage}
                </button>
            );
            paginationNumbers.push(<span key="ellipsis1">...</span>);
            for (let i = pageNumber - 1; i <= pageNumber + 1; i++) {
                paginationNumbers.push(
                    <button
                        key={i}
                        onClick={() => setPageNumber(i)}
                        disabled={pageNumber === i}
                    >
                        {i}
                    </button>
                );
            }
            paginationNumbers.push(<span key="ellipsis2">...</span>);
            paginationNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => setPageNumber(totalPages)}
                    disabled={pageNumber === totalPages}
                >
                    {totalPages}
                </button>
            );
        }

        return paginationNumbers;
    };

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const slicedData = data?.comments?.slice(startIndex, startIndex + itemsPerPage);

    return {
        sorting: sortById,
        pagination: {
            nextPage,
            prevPage,
            generatePaginationNumbers,
        },
        refresh: refetch,
        searching: handleSearch,
        prevButton: prevPage,
        nextButton: nextPage,
        generatePaginationNumbers,
        slicedData,
        pageNumber,
        totalPages,
        isLoading,
        isError,
        error,
    };
};

export default useFetchData;
