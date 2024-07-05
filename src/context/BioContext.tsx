"use client"

import { createContext, useState } from "react"

interface BioContextTypes{
    output: {data: {bio: string}[]};
    loading: boolean;
    setOutput: React.Dispatch<React.SetStateAction<{data: {bio: string}[]}>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BioContext = createContext<BioContextTypes>({
    output: { data: []},
    loading: false,
    setOutput: () => {},
    setLoading: ()=> {}

})

export const BioContextProvider = ({children}: {children: React.ReactNode}) => {
    const [output, setOutput] = useState<{data: {bio: string}[]}>({data: []});
    const [loading, setLoading] = useState(false);

    return (
        <BioContext.Provider value={{output, setOutput, loading, setLoading}}>
            {children}
        </BioContext.Provider>
    )
}

