const Pagination = ({ totalItems, itemsPerPage, onPageChange, currentPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    return (
        <div>
            <button onClick={prevPage} disabled={currentPage === 1}>
                Previous Page
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button key={index + 1} onClick={() => onPageChange(index + 1)} disabled={currentPage === index + 1}>
                    {index + 1}
                </button>
            ))}
            <button onClick={nextPage} disabled={currentPage === totalPages}>
                Next Page
            </button>
        </div>
    );
};

export default Pagination;