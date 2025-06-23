import React from 'react';
import {connect} from 'react-redux';

import {selectCollection} from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";

import './collection.styles.scss';
import {useParams} from "react-router-dom";

const CollectionPage = ({collection}) => {
    if (!collection) {
        return <div className='collection-page'>Loading collection...</div>;
    }

    const {title, items} = collection;
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className="items">
                {
                    Array.isArray(items) && items.map(item => <CollectionItem key={item.id} item={item}/>)
                }
            </div>
        </div>
    );
};

const CollectionPageContainer = () => {
    const { collectionId } = useParams();

    const mapStateToProps = (state) => ({
        collection: selectCollection(collectionId)(state)
    });

    const ConnectedCollectionPage = connect(mapStateToProps)(CollectionPage);

    return <ConnectedCollectionPage />;

};

export default CollectionPageContainer;

