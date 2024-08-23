import React, { useEffect, useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Article {
  title: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  url: string;
  publishedAt: string;
}

interface ArticlesListProps {
  viewMode: "list" | "grid";
}

const ArticlesList: React.FC<ArticlesListProps> = ({ viewMode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlesPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?country=in&apiKey=b274de976a15405294b7aeb6efbf479a"
        );
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  // Calculate the articles to display on the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p>Loading articles...</p>;
  }

  return (
    <div className="px-4">
      <div
        className={`${
          viewMode === "list"
            ? "flex flex-col gap-6"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }`}
      >
        {currentArticles.map((article, index) => (
          <div
            key={index}
            className={`relative ${
              viewMode === "list"
                ? "flex items-start p-4 bg-white rounded-lg shadow-md"
                : "bg-white rounded-lg hover:shadow-lg"
            }`}
          >
            <div className="absolute top-2 right-2 text-gray-500 cursor-pointer">
              <FaTimes />
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${viewMode === "list" ? "w-24 h-24" : ""}`}
            >
              <img
                loading="lazy"
                src="/rectangle.png"
                alt={article.title}
                className={`object-cover ${
                  viewMode === "list" ? "w-24 h-24 rounded-full" : ""
                }`}
              />
            </a>
            <div
              className={`ml-4 flex flex-col justify-between ${
                viewMode === "list" ? "flex-1" : ""
              }`}
            >
              <div>
                <h2 className="text-base font-bold text-gray-800">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {article.source.name || "Unknown Source"}
                </p>
                <p className="text-xs text-gray-500">
                  {article.author || "Unknown Author"}
                </p>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                <time>{formatDate(article.publishedAt)}</time>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="mx-2 p-2 text-white bg-gray-700 rounded hover:bg-gray-600 disabled:bg-gray-400"
        >
          <FaChevronLeft />
        </button>
        <span className="mx-2 p-2 text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="mx-2 p-2 text-white bg-gray-700 rounded hover:bg-gray-600 disabled:bg-gray-400"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ArticlesList;
