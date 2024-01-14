import {stylesType} from "../utils/types.ts";
import {
    ambreCardBoxGrey,
    muiMiddleGrey,
    primaryDark,
    primaryLight,
    primaryMain,
    primaryMainDark
} from "./muiTheme.ts";

const ambreCardBoxShadow = `0px 0px 3px 0px ${ambreCardBoxGrey}`;

const ambreBorder = (color: string, size = 1) => ({
    border: `${size}px solid ${color}`,
    borderRadius: 1,
});

export const styles: stylesType = {
    // ******************************************
    // * COMMON
    // ******************************************
    reactGridLayout: {
        boxShadow: ambreCardBoxShadow,
        borderRadius: 3,
        background: '#FFFFFF',
        overflow: 'hidden',
    },
    ambreCard: {
        padding: 2,
         ...ambreBorder(primaryDark, 2),
        height: '100%',
    },
    ambreCardTitle: {
        ...ambreBorder(primaryMain, 2),
        fontSize: 18,
        fontWeight: 800,
        textTransform: 'uppercase',
        height: 30,
        maxHeight: 30,
    },
    ambreCardContent: {
        maxHeight: '100vh', // don't go over screen
        overflowY: 'auto', // overflow as scroll
        // width: '100%',
        // height: '100%',
        ...ambreBorder(primaryLight, 2),
        padding: 1,
        paddingBottom: 0,
        fontFamily: 'TitilliumWeb',
        userSelect: 'none',
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
    jsonView: {  // https://uiwjs.github.io/react-json-view/#online-editing-theme
        '--w-rjv-key-string': primaryDark,

        '--w-rjv-curlybraces-color': primaryDark,
        '--w-rjv-colon-color': primaryDark,
        '--w-rjv-brackets-color': primaryDark,
        '--w-rjv-quotes-color': primaryDark,
        '--w-rjv-quotes-string-color': primaryDark,

        '--w-rjv-color': primaryDark,
        '--w-rjv-info-color': primaryLight,
        '--w-rjv-arrow-color': primaryDark,
        '--w-rjv-update-color': primaryLight,
        '--w-rjv-copied-color': primaryMainDark,
        '--w-rjv-copied-success-color': primaryDark
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
        width: 100,
        filter: 'invert(78%) sepia(95%) saturate(1004%) hue-rotate(339deg) brightness(101%) contrast(101%)'
    },
    softTitle: {
        fontSize: 26,
        marginTop: -20,
        color: primaryMain,
    },
    softSubTitle: {
        fontSize: 11,
        color: primaryLight,
        marginTop: -7
    },
    formCardFirstInput: {
        marginBottom: 1,
        paddingTop: 1
    },
    mqttMessages: {
        ...ambreBorder(primaryMain),
        marginBottom: 1,
        paddingLeft: 1,
        paddingRight: 1
    },
    messageDateTime: {
        color: muiMiddleGrey,
        paddingLeft: 1,
        fontSize: 12
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
        ...ambreBorder(primaryLight, 2),
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
