import CustomerHeader from '~/components/headers/CustomerHeader';
import CustomerFooter from '~/components/footers/CustomerFooter';
import News from '~/components/contents/News';
import { Outlet } from 'react-router-dom';
import { getData } from '~/webService';
import { useEffect, useState } from 'react';

export default function CustomerLayout() {
    const [data, setData] = useState({});
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart'))?.length ?? 0);
    useEffect(() => {
        (async () => {
            const resData = await getData();
            setData(resData);
        })();
    }, [setData]);
    return (
        <div>
            <CustomerHeader cart={cart} data={data?.types} />
            <News />
            <Outlet context={[data, setCart, cart]} />
            <CustomerFooter />
        </div>
    );
}
