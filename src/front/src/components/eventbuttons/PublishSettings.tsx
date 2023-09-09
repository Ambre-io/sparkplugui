import React from 'react';

import {useTranslation} from "react-i18next";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import {useLazyQuery} from "@apollo/client";
import {AmbreButton} from "../ambre/AmbreButton";


export const PublishSettings: React.FC = () => {

    const { t } = useTranslation();

    // const [getPublishSettings] = useLazyQuery(TODO, {
    //     fetchPolicy: "no-cache"  // TODO search if it's a good practice + learn how apollo cache works
    // });

    const goClick = () => {
        // getPublishSettings().then((res) => {
        //     console.log(`Published=${res.data.publish.isPublish}`);
        // }).catch((e) => {
        //     console.error('PublishSettings: query fail', e);
        // });
    };

    return (
        <AmbreButton
            onClick={goClick}
            variant="contained"
            endIcon={<SendOutlinedIcon/>}
        >
            {t('publish')}
        </AmbreButton>
    );
};
