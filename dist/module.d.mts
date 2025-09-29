import * as _nuxt_schema from '@nuxt/schema';

interface GeminiModuleOptions {
    provider: 'developer' | 'vertex';
    model: string;
    apiVersion?: 'v1' | 'v1alpha';
    safetyPreset?: 'strict' | 'balanced' | 'relaxed';
    grounding?: {
        enabled: boolean;
        provider?: 'google-search';
    };
    files?: {
        enabled: boolean;
    };
    live?: {
        enabled: boolean;
        defaultModel?: string;
    };
    routes?: {
        prefix: string;
    };
    vertex?: {
        project?: string;
        location?: string;
    };
}
declare const _default: _nuxt_schema.NuxtModule<GeminiModuleOptions, GeminiModuleOptions, false>;

export { _default as default };
export type { GeminiModuleOptions };
