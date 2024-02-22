import React, { useContext, useMemo, useState } from "react";
import { App } from "../App";
import type { PaletteOptions } from "@mui/material/styles/createPalette";
import axios, { type AxiosInstance } from "axios";

type LMSContextProps = {
  TOKEN: string;
  BASE_URL: string;
  axiosInstance: AxiosInstance;
};

type Props = {
  children: React.ReactNode;
  token: string;
  base_url: string;
  theme?: "light" | "dark";
  palette?: PaletteOptions;
};

const LMSContext = React.createContext<LMSContextProps>({} as LMSContextProps);

export const LMSProvider: React.FC<Props> = ({
  children,
  token,
  base_url,
  theme,
  palette,
}) => {
  const [Token, setToken] = useState(token);

  const axiosInstance = axios.create({
    baseURL: base_url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const value: LMSContextProps = useMemo(() => {
    return {
      TOKEN: Token,
      BASE_URL: base_url,
      axiosInstance: axiosInstance,
    };
  }, [token, base_url, axiosInstance]);

  return (
    <LMSContext.Provider value={value}>
      <App theme={theme} palette={palette}>
        {children}
      </App>
    </LMSContext.Provider>
  );
};

export const useLMS = () => useContext(LMSContext);
