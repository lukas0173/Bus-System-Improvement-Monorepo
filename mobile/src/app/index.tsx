import { Redirect } from "expo-router";

export default function Index() {
  // This component will automatically redirect to the /home route.
  return <Redirect href="/home" />;
}
