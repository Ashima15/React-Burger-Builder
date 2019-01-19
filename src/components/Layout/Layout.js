import React from 'react';

import Aux from '../../hoc/Aux';

import './Layout.css'

const layout = (props) => {
    return (
        <Aux>
            <div>Backdrop, sidebar and navbar</div>
            <main className="content">
                {props.children}
            </main>
        </Aux>
    )
}

export default layout;