import React from "react";
import PropTypes from "prop-types";
import {CustomButtonContainer} from './custom-button.styles';

const CustomButton = ({ children, ...otherProps }) => (
    <CustomButtonContainer {...otherProps}>
        {children}
    </CustomButtonContainer>
);

CustomButton.displayName = 'CustomButton';

CustomButton.propTypes = {
    children: PropTypes.node.isRequired,
};

export default React.memo(CustomButton);
