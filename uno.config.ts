import { defineConfig } from 'unocss';
import { presetWind } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
    shortcuts: {},
    theme: {
        colors: {
            primary: '#fc0',
        },
    },
    rules: [],
    variants: [],
    transformers: [transformerDirectives()],
    presets: [presetWind()],
});
