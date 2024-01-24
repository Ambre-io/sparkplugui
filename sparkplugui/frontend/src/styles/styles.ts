import {stylesType} from "../utils/types.ts";
import {
    ambreCardBoxGrey,
    primaryDark,
    primaryDarkLight,
    primaryLight,
    primaryMain,
    primaryMainDark,
    primaryMainSupraLight
} from "./muiTheme.ts";

const ambreCardBoxShadow = `0px 0px 3px 0px ${ambreCardBoxGrey}`;

const ambreBorder = (color: string, size = 1, radius = 1) => ({
    border: `${size}px solid ${color}`,
    borderRadius: radius,
});

export const styles: stylesType = {
    // ******************************************
    // * COMMON
    // ******************************************
    toastContainer: { // https://fkhadra.github.io/react-toastify/how-to-style
        '--toastify-icon-color-success': primaryLight,
        '--toastify-icon-color-error': primaryDark,
        '--toastify-text-color-light': primaryMain, // color
        '--toastify-color-light': primaryMainSupraLight, // background
        '--toastify-font-family': 'TitilliumWeb',
        fontSize: 18,
    },
    RGLContainer: {
        boxShadow: ambreCardBoxShadow,
        borderRadius: 3,
        background: primaryDarkLight,
        height: '100%',
    },
    ambreCard: {
        height: '100%',
        p: 1,
        userSelect: 'none',
        overflow: 'hidden'
    },
    ambreCardTitle: {
        fontFamily: 'TitilliumWebBold',
        fontSize: 18,
        fontWeight: 800,
        textTransform: 'uppercase',
    },
    ambreCardContentContainer: {
        ...ambreBorder(ambreCardBoxGrey, 1),
        background: primaryMainSupraLight,
        height: 'calc(100% - 30px)',
        overflow: 'auto',
    },
    ambreCardContent: {
        paddingLeft: 1,
        paddingRight: 2,
        paddingTop: 1,
    },
    color: (color: string) => ({
        color: color
    }),
    padding: (p: number) => ({
        padding: p
    }),
    paddingLeft: (p: number) => ({
        paddingLeft: p
    }),
    paddingRight: (p: number) => ({
        paddingRight: p
    }),
    paddingBottom: (p: number) => ({
        paddingBottom: p
    }),
    jsonView: {  // https://uiwjs.github.io/react-json-view/#online-editing-theme
        '--w-rjv-key-string': primaryDark,
        '--w-rjv-curlybraces-color': primaryDark,
        '--w-rjv-colon-color': primaryDark,
        '--w-rjv-brackets-color': primaryDark,
        '--w-rjv-quotes-color': primaryDark,
        '--w-rjv-color': primaryDark,
        '--w-rjv-info-color': primaryLight,
        '--w-rjv-arrow-color': primaryDark,
        '--w-rjv-update-color': primaryLight,
        '--w-rjv-copied-color': primaryMainDark,
        '--w-rjv-copied-success-color': primaryDark,
        '--w-rjv-quotes-string-color': primaryDark,
        '--w-rjv-type-string-color': primaryMainDark,
    },
    // ******************************************
    // * SPECIFIC
    // ******************************************
    softContainer: {
        background: primaryMainSupraLight,
        ...ambreBorder(ambreCardBoxGrey, 1),
        borderRadius: 1,
        height: '100%',
        userSelect: 'none',
    },
    softLogo: {
        width: 100,
        filter: 'invert(78%) sepia(95%) saturate(1004%) hue-rotate(339deg) brightness(101%) contrast(101%)'
    },
    softTitle: {
        fontFamily: 'TitilliumWebBold',
        fontSize: 26,
        marginTop: -20,
        color: primaryMain,
    },
    softSubTitle: {
        fontFamily: 'TitilliumWebBold',
        fontSize: 11,
        color: primaryLight,
        marginTop: -7
    },
    softActions: {
        marginTop: '-5px'
    },
    formCardFirstInput: {
        marginBottom: 1,
        paddingTop: 1
    },
    mqttMessages: {
        ...ambreBorder(primaryMain, 1),
        marginBottom: 1,
        paddingLeft: 1,
        paddingRight: 1,
        overflowWrap: 'break-word'
    },
    messageDateTime: {
        color: primaryMain,
        paddingLeft: 1,
        fontSize: 12,
        fontFamily: 'TitilliumWebBold'
    },
    mqttTopic: {
        color: primaryLight,
        fontFamily: 'TitilliumWebBold',
    },
    tree: {
        userSelect: 'none',
        paddingRight: 3,
        paddingBottom: 1,
        overflowWrap: 'break-word'
    },
    lastMessage: {
        paddingBottom: 1,
        color: primaryDark
    },
    // spinOnClick: {
    //     padding: '6px',
    //     minWidth: '20px',
    //     '&:active': {
    //         '& .MuiSvgIcon-root': {
    //             animation: "spin 1s linear",
    //             "@keyframes spin": {
    //                 "0%": {
    //                     transform: "rotate(360deg)",
    //                 },
    //                 "100%": {
    //                     transform: "rotate(0deg)",
    //                 }
    //             }
    //         }
    //     }
    // }
}
