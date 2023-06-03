import Link from 'next/link';
import React from 'react'

interface SearchResultProps {
    data: {
        page: number;
        results: {
            name: string;
            pub_url: string;
            cu_author: string;
            date: string;
        }[];
        size: number;
        totalData: number;
        error: string;
    };
}


function SearchResult({ data }: SearchResultProps) {

    console.log('data', data)

    return (
        <section className='p-10 w-full h-full flex-1 container mx-auto'>

            {
                data?.error || (data?.results?.length === 0) ?
                    <div className='bg-white p-5'>
                        No Data Found
                    </div>
                    :
                    <>{
                        data?.results?.length > 0 ?
                            <div className='mb-4 flex flex-wrap gap-2 justify-between px-3 font-semibold'>
                                <label className='text-gray-600 '>
                                    Search Results...
                                </label>
                                <label className='text-gray-600'>
                                    Total Results: {data?.totalData}
                                </label>
                            </div>
                            : ""
                    }
                        <ul>
                            {
                                data?.results?.map((value: {
                                    name: string;
                                    pub_url: string;
                                    cu_author: string;
                                    date: string;
                                }) =>
                                    <li className='bg-white w-full p-5 rounded-md border px-5 mb-3  text-ellipsis overflow-x-hidden '>
                                        <div className='mb-2 text-ellipsis overflow-x-hidden'>
                                            <Link href={value?.pub_url} target="_blank" className='text-blue-600 font-semibold hover:underline text-base '>{value?.name}</Link><br />
                                            <Link href={value?.pub_url} target="_blank" className='text-neutral-400 text-sm'>{value?.pub_url}</Link>
                                        </div>
                                        <p className='text-neutral-400 text-sm'>{value?.cu_author}, {value?.date}</p>
                                        {/* <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0" /></svg></button> */}
                                    </li>
                                )
                            }

                        </ul>

                    </>
            }
        </section>
    )
}

export default SearchResult