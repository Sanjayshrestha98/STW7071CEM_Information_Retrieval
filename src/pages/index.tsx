import { Formik, Form, Field } from 'formik';
import Image from 'next/image'
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setKeyword } from './store/slices/SearchSlice';
import SearchResult from './searchresults/SearchResult';

export default function Home() {

  const router = useRouter()
  // const [keyword, setKeyword] = useState<string>()
  const dispatch = useDispatch();

  const initialValues: FormValues = {
    keyword: '',
  };

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [keyword, setSearchKeyword] = useState<string>('')
  const [pageLimit, setPageLimit] = useState<number>(10)

  const getSearchResult = async (keyword: string) => {
    fetch(`http://localhost:8000/search?query=${keyword}&page=${pageNumber}&size=${pageLimit}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setSearchResults(data);
        setIsLoading(false)
      }).catch((err) => {
        console.log(err)
        setIsLoading(false)

      });
  };

  console.log('keyword', keyword)

  useEffect(() => {
    if (keyword) {
      setIsLoading(true)
      getSearchResult(keyword)
    }
  }, [keyword, pageNumber])

  const handleSubmit = (values: FormValues) => {
    if (values.keyword) {
      setIsLoading(true)
      setPageNumber(1)
      setSearchKeyword(values.keyword)
      dispatch(setKeyword(values.keyword));
      getSearchResult(values.keyword);
    }
  };

  interface FormValues {
    keyword: string;
  }

  interface searchResults {
    page: number;
    results: {
      name: string;
      pub_url: string;
      cu_author: string;
      date: string;
    }[];
    size: number;
    totalData: number;
  }

  return (
    <main
      className={`pb-20`}
    >
      {
        isLoading ?
          <div className="min-h-full min-w-full bg-gray-300 fixed top-0 z-50 left-0 bg-opacity-40 grid place-items-center">
            <div className="flex gap-4 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5" /><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate" /></path></svg>
              <label className="font-semibold"> Processing</label>
            </div>
          </div>
          :
          ""
      }
      <section className='flex flex-col gap-10 p-20 pb-10 place-items-center bg-brand-4 px-10 '>
        <Image alt='logo' width={'200'} height={'40'} src={"/cu.svg"} priority={true} style={{ width: "auto", height: "auto", maxWidth: "200px" }} />
        <div className='relative w-full flex bg-white container overflow-hidden rounded-md '>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className='flex w-full'>
                <button type='submit' className='h-full py-3 bg-brand-5 px-3 border border-gray-400 rounded-l-md' >
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 16 16">
                    <path fill="#fff" d="M9.107 10.168a4.5 4.5 0 1 1 1.06-1.06l3.613 3.612a.75.75 0 1 1-1.06 1.06l-3.613-3.612ZM9.5 6.5a3 3 0 1 0-6 0a3 3 0 0 0 6 0Z" />
                  </svg>
                </button>
                <Field name="keyword" type='search'
                  className='field !border-0 w-full !m-0 focus:outline-none' placeholder='Search' />
              </Form>
            )}
          </Formik>

        </div>
      </section>

      <SearchResult data={searchResults} />

      {
        (searchResults?.results?.length === undefined)
          ?
          ""
          :
          <div className='flex justify-between items-center container mx-auto px-10'>
            <button disabled={pageNumber === 1}
              onClick={() => {
                setIsLoading(true)
                setPageNumber(pageNumber - 1)
              }} className={`flex items-center gap-2 px-6 py-2 bg-brand-3 rounded-md text-white ${pageNumber === 1 && "bg-gray-300"
                }`}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path fill="currentColor" d="M3.636 11.293a1 1 0 0 0 0 1.414l5.657 5.657a1 1 0 0 0 1.414-1.414L6.757 13H20a1 1 0 1 0 0-2H6.757l3.95-3.95a1 1 0 0 0-1.414-1.414l-5.657 5.657Z" /></g></svg> Previous</button>
            <span>
              Page{" "}
              <strong>
                {pageNumber} of {Math.ceil(searchResults?.totalData / pageLimit)}
              </strong>{" "}
            </span>
            <button
              disabled={pageNumber === Math.ceil(searchResults?.totalData / pageLimit)}
              onClick={() => {
                setIsLoading(true)
                setPageNumber(pageNumber + 1)
              }} className={`flex items-center gap-2 px-6 py-2 bg-brand-3 rounded-md text-white ${pageNumber === Math.ceil(searchResults?.totalData / pageLimit) && "bg-gray-300"
                }`}>Next <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 12l-6-6m6 6l-6 6m6-6H5" /></svg></button>
          </div>
      }

    </main>
  )
}
