/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import Grid from "@mui/material/Grid";

import {AmbreCardType} from "../../utils/types.ts";
import {styles} from "../../styles/styles.ts";
import {useEffect, useRef} from "react";


export const AmbreCard = (props: AmbreCardType) => {

    const {title, children, stickToBottom = false} = props;

     // Auto scroll to the bottom
    const scrollToBottomRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (stickToBottom && scrollToBottomRef !== null && scrollToBottomRef.current !== null) {
            scrollToBottomRef.current.scrollTop = scrollToBottomRef.current.scrollHeight;
        }
    };

    // Reaching the absolute bottom
    useEffect(() => {
        if (stickToBottom && scrollToBottomRef !== null && scrollToBottomRef.current !== null) {
            scrollToBottomRef.current.addEventListener('DOMNodeInserted', scrollToBottom);
            return () => {
                if (stickToBottom && scrollToBottomRef !== null && scrollToBottomRef.current !== null) {
                    scrollToBottomRef.current.removeEventListener('DOMNodeInserted', scrollToBottom);
                }
            };
        }
    }, []);

    return (
        <Grid container id={title} sx={styles.ambreCard}>
            <Grid item xs={12} sx={styles.ambreCardTitle}>
                {title}
            </Grid>
            <Grid ref={scrollToBottomRef} item xs={12} sx={styles.ambreCardContentContainer}>
                <Grid container sx={styles.ambreCardContent}>
                    <Grid item xs={12}>
                        {children}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
