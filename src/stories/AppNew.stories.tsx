import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import App from "../App";

import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'App',
    components: App,
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>

export const AppNewExample: ComponentStory<typeof App> = () =><App/>;
