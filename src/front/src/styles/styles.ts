import {stylesType} from "../utils/types";
import {primaryLight} from "./muiTheme";

export const styles: stylesType = {
    // ******************************************
    // * COMMON
    // ******************************************
    color: (color: any) => ({
        color: color
    }),
    ambreCardContainer: {
        padding: 2,
    },
    ambreCard: {
        flexGrow: 1,
        boxShadow: '0px 0px 3px 0px #B7B7B7',
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
    subtitle: {
        marginLeft: 10,
        marginTop: 4,
        marginBottom: 0,
        fontWeight: 800,
        fontSize: 20,
        textTransform: 'uppercase',
    },
    formControl: {
        marginBottom: 1
    },
    mqttMessagesContainer: {
        maxHeight: '90.5vh', // don't go over screen
        overflowY: 'auto', // scroll for overflow
        width: '100%',
        border: `1px solid ${primaryLight}`,
        borderRadius: 1,
        padding: 2,
        paddingBottom: 1
    },
    mqttMessages: (primaryMain: any) => ({
        border: `1px solid ${primaryMain}`,
        borderRadius: 1,
        marginBottom: 1,
        padding: 1
    }),
    tree: {
        userSelect: 'none'
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
