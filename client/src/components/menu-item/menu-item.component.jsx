import React from 'react';
import {
    BackgroundImageContainer,
    ContentContainer,
    ContentSubtitle,
    ContentTitle,
    MenuItemContainer
} from './menu-item.styles';
import {useNavigate} from "react-router-dom";

const MenuItemComponent = ({ title, imageUrl, size , history, linkUrl, match}) => (
    <MenuItemContainer size={size} onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <BackgroundImageContainer className="background-image" imageUrl={imageUrl} />
        <ContentContainer className="content">
            <ContentTitle>{title.toUpperCase()}</ContentTitle>
            <ContentSubtitle>SHOP NOW</ContentSubtitle>
        </ContentContainer>
    </MenuItemContainer>
);

const MenuItem = (props) => {
    const navigate = useNavigate();
    return <MenuItemComponent {...props} navigate={navigate} />;
};


export default MenuItem;
