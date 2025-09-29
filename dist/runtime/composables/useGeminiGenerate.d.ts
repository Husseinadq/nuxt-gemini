export declare function useGeminiGenerate(): {
    generate: (body: {
        prompt: string;
        config?: any;
        files?: string[];
    }) => Promise<any>;
    pending: any;
    error: any;
    text: any;
    json: <T = any>() => T;
};
