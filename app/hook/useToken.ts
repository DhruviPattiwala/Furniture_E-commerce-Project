import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode'; 
import { api } from '../services/apiClient';
import { JwtPayloadType } from '../utils/type';
import {toast} from "sonner";
export function useToken() {
    const [tokenData, setTokenData] = useState<JwtPayloadType | null>(null);
    const { data: rawToken } = useQuery<string | null>({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await api.get(`api/logout`);
            return res.data.token; 
        },
    });

    useEffect(() => {
        setTimeout(() => {
            if (rawToken) {
                try {
                    const decoded = jwtDecode<JwtPayloadType>(rawToken);
                    setTokenData(decoded);
                } catch (error) {
                    toast.error(`Failed to decode token ${(error as Error).message}`);
                    setTokenData(null);
                }
            } else {
                setTokenData(null);
            }
             }, 0);
        }, [rawToken]);
   


    return  tokenData ;
}





