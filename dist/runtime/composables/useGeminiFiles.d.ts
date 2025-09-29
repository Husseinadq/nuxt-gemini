export declare function useGeminiFiles(): {
    upload: (file: File) => Promise<{
        name: string;
        uri: string;
        displayName?: string;
    }>;
    list: () => Promise<any[]>;
};
