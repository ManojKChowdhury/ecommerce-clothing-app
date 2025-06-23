import React from 'react';
import {
    BackgroundImageContainer,
    ContentContainer,
    ContentSubtitle,
    ContentTitle,
    MenuItemContainer
} from './menu-item.styles';
import {useNavigate} from "react-router-dom";

const MenuItem = ({ title, imageUrl, size , linkUrl}) =>
{
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(linkUrl);
    };

    return(
        <MenuItemContainer size={size} onClick={handleClick}>
            <BackgroundImageContainer className="background-image" $imageurl={imageUrl} />
            <ContentContainer className="content">
                <ContentTitle>{title?.toUpperCase() ||title}</ContentTitle>
                <ContentSubtitle>SHOP NOW</ContentSubtitle>
            </ContentContainer>
        </MenuItemContainer>
    );
}

export default MenuItem;
