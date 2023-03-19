import React from 'react'
import { TransferCard, MiniCard } from 'features/payout';
import { Button, IconButton, Image } from 'components'
import Modal from 'components/Modal'
import { DeleteIcon, EditIcon } from 'lib/@heroicons';
import useModal from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useSWR, type Fetcher } from 'lib/swr';
import { NextPageWithLayout } from 'types';

const BankAccounts: NextPageWithLayout = () => {
    const [todo, setTodo] = useState({});
    const [loading, setLoading] = useState(false);
    const modalObj = useModal();
    // useEffect(() => {
    //     setLoading(true);
    //     fetch('https://jsonplaceholder.typicode.com/todos/1')
    //         .then(response => response.json())
    //         .then(json => { setTodo(json); setLoading(false) });
    // }, []);
    // if (loading) return <h2>Loading...</h2>
    const fetcher: Fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error, isLoading } = useSWR("https://jsonplaceholder.typicode.com/todos", fetcher);
    console.log(data);
    console.log(error);

    if (error) return <>Faild load </>
    if (!data) return <>Loading...</>
    return (
        <>
            {data && data.map((todo: { id: string, title: string }) => {
                return <div className='mb-5 block' key={todo.id}>{todo.id + "_ " + todo.title}</div>
            })}
        </>

    )
}

BankAccounts.mainLayoutProps = {
    title: "Bank Accounts",
    contentClassName: "flex-col"
}
export default BankAccounts;