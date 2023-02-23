import { Router, useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react';

export default function ProductPage() {
    const router = useRouter()
    const {status, data} = useSession();
    console.log(data)

    useEffect(() => {
        if(status === 'unauthenticated') router.replace("/auth/login")
    }, [status]);

    if(status === 'authenticated')
        return (
            <>
                <h2>prodected</h2>
                <h2>{ router.query.id }</h2>
            </>
        )

    return <>Loading</>
}