import React, { useEffect, useState } from 'react';
import CardLoading from '../components/CardLoading';
import SummaryApi from '../common/SummartApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import CardProduct from '../components/CardProduct';
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingArrayCard = new Array(10).fill(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          page: page,
          // limit: 12,
          search: '',
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
          setTotalPages(responseData.page);
        } else {
          setData([...data, ...responseData.data]);
          setTotalPages(responseData.page);
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleFetchMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <section className='bg-white'>
      <div className='container mx-auto p-4'>
        {/* Sticky header for search results */}
        <div className='sticky top-0 bg-white z-10 p-4 shadow-md'>
          <p className='font-semibold'>
            Search Results: {data.length}{' '}
            {data.length > 1 ? 'Products' : 'Product'}{' '}
          </p>
        </div>

        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={handleFetchMore}>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-4 lg:grid-cols-5'>
            {data.map((product) => {
              return <CardProduct key={product._id} data={product} />;
            })}

            {/* loading Data */}
            {loading &&
              loadingArrayCard.map((_, idx) => {
                return <CardLoading key={idx} />;
              })}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default SearchPage;
