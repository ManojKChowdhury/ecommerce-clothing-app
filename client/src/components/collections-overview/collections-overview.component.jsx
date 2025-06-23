import React, {memo} from "react";
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import PropTypes from 'prop-types';

import {selectCollectionsForPreview} from "../../redux/shop/shop.selectors";
import CollectionPreview from "../collection-preview/collection-preview.component";
import './collections-overview.styles.scss';

const CollectionsOverview = ({collections}) => (
    <div className='collections-overview'>
        {collections && collections.length > 0 ? (
            collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        ) : (
            <p>No collections available</p>
        )}
    </div>
);

CollectionsOverview.propTypes = {
    collections: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(memo(CollectionsOverview));
