import {configure} from '@storybook/react';
import interopRequireDefault from 'babel-runtime/helpers/interopRequireDefault';

//~Story.jsx 로 끝나는 파일들을 자동으로 storybook에 등록시킨다.
function loadStories (){
    const context = require.context('../src/stories',true,/Story\.jsx$/);
    context.keys().forEach( srcFile =>{
        interopRequireDefault(context(srcFile));
    });
}

configure(loadStories,module);