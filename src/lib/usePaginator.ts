import { useState, useEffect, useCallback } from 'react';

export interface PaginationOptions {
    limit: number;
    skip: number;
}

export interface PaginationResponse<T> {
    data: T[];
    total: number;
}

interface UsePaginatorReturn<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    error: string | null;
    nextPage: () => void;
    prevPage: () => void;
    goToPage: (page: number) => void;
    refresh: () => void;
}

const usePaginator = <T>(
    fetchApi: (options: PaginationOptions) => Promise<PaginationResponse<T>>,
    initialPage: number = 1,
    initialPageSize: number = 10
): UsePaginatorReturn<T> => {
    const [data, setData] = useState<T[]>([]);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [pageSize] = useState(initialPageSize);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const skip = (currentPage - 1) * pageSize;
            const response = await fetchApi({ limit: pageSize, skip });
            setData(response.data);
            setTotalPages(Math.ceil(response.total / pageSize));
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [fetchApi, currentPage, pageSize]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const refresh = () => {
        fetchData();
    };

    return {
        data,
        currentPage,
        totalPages,
        isLoading,
        error,
        nextPage,
        prevPage,
        goToPage,
        refresh,
    };
};

export default usePaginator;