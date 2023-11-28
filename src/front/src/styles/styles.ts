import {stylesType} from "../utils/types";
import {ambreCardBoxGrey, primaryDark, primaryLight, primaryMain} from "./muiTheme";

const ambreCardBoxShadow = `0px 0px 3px 0px ${ambreCardBoxGrey}`;

const ambreBorder = (color: string, size: number = 1) => ({
    border: `${size}px solid ${color}`,
    borderRadius: 1,
});

export const styles: stylesType = {
    // ******************************************
    // * COMMON
    // ******************************************
    ambreCard: {
        flexGrow: 1,
        boxShadow: ambreCardBoxShadow,
        borderRadius: 1,
        padding: 3,
        background: '#FFFFFF',
        overflow: 'hidden',
    },
    noOverflowContainer: {
        maxHeight: '100%',
        overflowY: 'auto',
    },
    ambreEventButton: {
        padding: 1
    },
    color: (color: string) => ({
        color: color
    }),
    padding: (p: number) => ({
        padding: p
    }),
    width100: {
        width: '100%'
    },
    marginBottom1: {
        marginBottom: 1
    },
    marginBottom2: {
        marginBottom: 2
    },
    // ******************************************
    // * SPECIFIC
    // ******************************************
    softContainer: {
        textAlign: 'center',
        paddingLeft: 1,
        paddingRight: 3
    },
    softLogo: {
        width: 100
    },
    softTitle: {
        fontSize: 26,
        marginTop: -20
    },
    softSubTitle: {
        fontSize: 12,
        color: '#a5a5a5',
        marginTop: -7
    },
    title: {
        marginLeft: 10,
        marginTop: 4,
        marginBottom: 0,
        fontWeight: 800,
        fontSize: 20,
        textTransform: 'uppercase',
    },
    subtitle: {
        textTransform: 'uppercase',
    },
    mqttMessagesContainer: {
        maxHeight: '90.5vh', // don't go over screen
        overflowY: 'auto', // overflow as scroll
        width: '100%',
        ...ambreBorder(primaryLight),
        padding: 1,
        paddingBottom: 0,
        fontFamily: 'TitilliumWeb',
    },
    mqttMessages: {
        ...ambreBorder(primaryMain),
        marginBottom: 1,
        paddingLeft: 1,
        paddingRight: 1
    },
    mqttDateTime: {
        color: primaryLight,
        ...ambreBorder(primaryLight),
        fontSize: 11
    },
    mqttMoment: {
        padding: 4
    },
    mqttTopic: {
        color: primaryMain,
        fontFamily: 'TitilliumWebBold'
    },
    tree: {
        userSelect: 'none',
        paddingRight: 3
    },
    lastMessageContainer: {
        ...ambreBorder(primaryLight),
        color: primaryDark,
        marginTop: '2px',
        padding: 1,
        fontFamily: 'TitilliumWeb',
    },
    // ******************************************
    // * OTHER
    // ******************************************
    spinOnClick: {
        padding: '6px',
        minWidth: '20px',
        '&:active': {
            '& .MuiSvgIcon-root': {
                animation: "spin 1s linear",
                "@keyframes spin": {
                    "0%": {
                        transform: "rotate(360deg)",
                    },
                    "100%": {
                        transform: "rotate(0deg)",
                    }
                }
            }
        }
    }
}
