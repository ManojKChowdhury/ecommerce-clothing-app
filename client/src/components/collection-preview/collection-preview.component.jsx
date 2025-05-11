import React, {useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import CollectionItem from '../collection-item/collection-item.component';
import {CollectionPreviewContainer, PreviewContainer, TitleContainer} from './collection-preview.styles';

const CollectionPreview = ({ title, items, routeName }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        // Construct a path based on the current location
        const basePath = location.pathname.split('/').slice(0, -1).join('/') || location.pathname;
        navigate(`${basePath}/${routeName}`);
    };

    const filteredItems = useMemo(() => {
        return items.filter((item, idx) => idx < 4);
    }, [items]);

    return (
        <CollectionPreviewContainer>
            <TitleContainer onClick={handleClick}>
                {title?.toUpperCase()}
            </TitleContainer>
            <PreviewContainer>
                {filteredItems
                    .map(item => (
                        <CollectionItem key={item.id} item={item}/>
                    ))}
            </PreviewContainer>
        </CollectionPreviewContainer>
    );
};

export default CollectionPreview;