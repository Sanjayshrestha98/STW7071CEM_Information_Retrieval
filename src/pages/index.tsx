import { Formik, Form, Field } from 'formik';
import Image from 'next/image'
import * as Yup from 'yup';
import React, { useState } from 'react'
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

  const handleSearch = () => {
    // Perform search or other relevant actions using the updated keyword
  };


  const handleSubmit = (values: FormValues) => {
    // setKeyword(values.keyword)
    if (values.keyword) {
      dispatch(setKeyword(values.keyword));
      // router.push('/searchresult/' + values.keyword)
    }
    // router.push({
    //   pathname: '/search',
    //   query: { keyword: values.keyword },
    // });
  };

  interface FormValues {
    keyword: string;
  }

  interface data {
    results: {
      name: string;
      pub_url: string;
      cu_author: string;
      date: string;
    }[];
    page: number;
    limit: number;
  }

  const data = {
    "results": [
      {
        "name": "Moving beyond the binaries: Adam Jowett in conversation with Martin Milton",
        "pub_url": "https://pureportal.coventry.ac.uk/en/publications/moving-beyond-the-binaries-adam-jowett-in-conversation-with-marti-2",
        "cu_author": "Adam Jowett",
        "date": "1 May 2016"
      },
      {
        "name": "Contribution to Objects that Talk: OTT Objects That Talk, Exhibition at Central St Martins College of Art and Design, London",
        "pub_url": "https://pureportal.coventry.ac.uk/en/publications/contribution-to-objects-that-talk-ott-objects-that-talk-exhibitio",
        "cu_author": "Michael Goatman",
        "date": "Apr 2017"
      },
      {
        "name": "\"The collective strategic activities of middle managers: A case of institutional work upwards? “Authors Simon Cooper, Martin Kitchener, Cardiff Business School; Graeme Currie, Warwick Business School.",
        "pub_url": "https://pureportal.coventry.ac.uk/en/publications/the-collective-strategic-activities-of-middle-managers-a-case-of-",
        "cu_author": "Simon Cooper",
        "date": "2018"
      }
    ],
    "page": 0,
    "limit": 10
  }

  return (
    <main
      className={``}
    >
      <section className='flex flex-col gap-10 p-20 pb-10 place-items-center bg-brand-4 px-10 '>
        <Image alt='logo' width={'200'} height={'40'} src={"/next.svg"} priority={true} style={{ width: "auto", height: "auto", maxWidth: "200px" }} />
        <div className='relative w-full flex bg-white max-w-7xl overflow-hidden rounded-md '>

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

          {/* Filter Button */}
          <button type='button' className='h-full py-3 bg-white px-3 ' >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="gray"
                d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2zM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17z" />
            </svg>
          </button>
        </div>
      </section>

      <SearchResult data={data} />

    </main>
  )
}
