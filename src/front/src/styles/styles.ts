import {stylesType} from "../utils/types";
import {ambreCardBoxGrey, primaryDark, primaryLight, primaryMain} from "./muiTheme";

const ambreCardBoxShadow = `0px 0px 3px 0px ${ambreCardBoxGrey}`;

const ambreBorder = (color: string, size: number=1) => ({
    border: `${size}px solid ${color}`,
    borderRadius: 1,
});

export const styles: stylesType = {
    // ******************************************
    // * COMMON
    // ******************************************
    TitilliumWebBold: {
        fontFamily: 'TitilliumWebBold',
    },
    TitilliumWeb: {
        fontFamily: 'TitilliumWeb',
    },
    color: (color: any) => ({
        color: color
    }),
    ambreCardContainer: {
        padding: 2,
    },
    ambreCard: {
        flexGrow: 1,
        boxShadow: ambreCardBoxShadow,
        borderRadius: 1,
        padding: 3,
        background: '#FFFFFF',
        overflow: 'hidden',
    },
    alignCenter: {
        textAlign: 'center'
    },
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
    softCard: {
        width: 190,
        padding: 2
    },
    softLogo: {
        width: 150,
    },
    softTitle: {
        fontSize: 30,
        marginTop: -15
    },
    softSubTitle: {
        fontSize: 12,
        color: '#a5a5a5',
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
        ...ambreBorder(primaryLight, 2),
        padding: 2,
        paddingBottom: 1
    },
    mqttMessages: {
        ...ambreBorder(primaryMain),
        marginBottom: 1,
        padding: 1
    },
    tree: {
        userSelect: 'none'
    },
    lastMessageContainer: {
        ...ambreBorder(primaryDark, 1),
        marginTop: '2px',
        padding: 2,
    },
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
