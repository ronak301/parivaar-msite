import React from "react";
import { useApi } from "../../../api/useApi";
import { getUserCommunities } from "../../../api/directoryApi";

export default function AllCommunityScreen() {
  const { request: fetchUsercommunities, data } = useApi(getUserCommunities);

  React.useEffect(() => {
    fetchUsercommunities();
  }, []);

  console.log("datadata", data);
  return <div>AllCommunityScreen</div>;
}
