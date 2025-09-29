export declare function useGeminiChat(): {
    send: (promptOrMessages: any) => Promise<void>;
    delta: any;
    done: any;
    cancel: () => void;
};
