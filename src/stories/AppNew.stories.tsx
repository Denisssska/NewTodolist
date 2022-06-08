import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import AppNew from "../AppNew";

import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'AppNew',
    components: AppNew,
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppNew>

export const AppNewExample: ComponentStory<typeof AppNew> = () =><AppNew/>;
