import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import React from "react";

type Item = {
  id: string;
  label: string;
};

export type CommunityConfig = {
  features?: {
    WelcomeScreen?: boolean;
    AboutScreenExtraInfo?: boolean;
    ShowOnlyHeadsInAllMembers?: boolean;
  };
};

export type Config = {
  id: string;
  BloodGroups: Item[];
  BusinessTypes: Item[];
  Cities: Item[];
  CommunityTypes: Item[];
  FamilyMemberRelationshipTypes: Item[];
  Gender: Item[];
  Localities: Item[];
  State: Item[];
  appMeta: {
    currentVersionAndroid: {
      name: string;
      version: string;
    };
    currentVersionIos: {
      name: string;
      version: string;
    };
    minVersion: string;
  };
  configByCommunity: {
    [id: string]: CommunityConfig;
  };
};

type Props = {
  forceSync?: boolean;
};

export const useConfigManager = ({ forceSync }: Props) => {
  const config = useSelector((state: RootState) => state?.community?.config);
  const [loading, setLoading] = React.useState(false);

  const getCommunityConfig = React.useCallback((id: string) => {
    return config?.configByCommunity[id];
  }, []);

  return {
    loading,
    config,
    getCommunityConfig,
  };
};
