import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";
import {fetchCollectionsStart} from "../../redux/shop/shop.actions";


const ShopPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCollectionsStart());
    }, [dispatch]);

    return (
        <div className='shop-page'>
            <Routes>
                <Route path="/" element={<CollectionsOverviewContainer/>}/>
                <Route path="/:collectionId" element={<CollectionPageContainer/>}/>
            </Routes>
        </div>
    );

}

export default ShopPage;
