import * as React from 'react';

import Collapse from "@mui/material/Collapse";
import {TransitionProps} from "@mui/material/transitions";
import {animated, useSpring} from "@react-spring/web";


export const TreeItemTransition = (props: TransitionProps) => {
    const style = useSpring({
        from: {
            opacity: 0,
            transform: 'translate3d(20px,0,0)',
        },
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
        },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}
