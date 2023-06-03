import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import type { RootState } from "../store/store"
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setKeyword } from '../store/slices/SearchSlice';
import Link from 'next/link';

function Navbar() {

    const router = useRouter()
    const dispatch = useDispatch()
    const [sidebarToggle, setSideBarToggle] = useState<boolean>(false)

    const keyword = useSelector((state: RootState) => {
        return state.search.keyword
    })

    interface FormValues {
        keywords: string;
    }

    let initialValues: FormValues = {
        keywords: keyword
    }

    useEffect(() => {
        initialValues = { keywords: keyword }
    }, [keyword])


    const handleSubmit = (values: FormValues) => {
        if (values.keywords) {
            dispatch(setKeyword(values.keywords));
            router.push('/searchresult/' + values.keywords)
        }
    };

    return (
        <>
            {/* <div className={`bg-brand-4 flex items-center justify-between w-full px-5 py-3 sticky top-0 ${router.pathname.includes('login') && 'hidden'}`}>
                <button onClick={() => setSideBarToggle(!sidebarToggle)} className='text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17h14M5 12h14M5 7h14" /></svg>
                </button>
                {
                    (router.pathname.includes('/searchresult')) &&

                    <div className='w-full bg-white rounded-md mx-2 max-w-7xl'>
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            {(props) => (
                                <Form className='flex w-full'>
                                    <button type='submit' className='h-full py-3 bg-brand-5 px-3 border border-gray-400 rounded-l-md' >
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 16 16">
                                            <path fill="#fff" d="M9.107 10.168a4.5 4.5 0 1 1 1.06-1.06l3.613 3.612a.75.75 0 1 1-1.06 1.06l-3.613-3.612ZM9.5 6.5a3 3 0 1 0-6 0a3 3 0 0 0 6 0Z" />
                                        </svg>
                                    </button>
                                    <Field
                                        values={props.values.keywords}
                                        name="keywords"
                                        type='search'
                                        className='field !border-0 w-full !m-0 focus:outline-none'
                                        placeholder='Search'
                                    />
                                </Form>
                            )}
                        </Formik>
                    </div>
                }

                <div className='flex items-center gap-3'>
                    <button className='text-white bg-black rounded px-3 py-2 text-sm'>
                        Account
                    </button>

                    <Link className='text-white bg-black rounded px-3 py-2 text-sm' href={'/document/upload'}>
                        Upload Document
                    </Link>
                </div>
            </div> */}

        </>

    )
}

export default Navbar