import { useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";
import { SignOutButton } from '@/components/sign-out-button'

export function MainPage() {
    const { user } = useUser();
    
    if (!user) {
      throw new Error("User is not signed in - this should be unreachable");
    }

    return <>
      <Text>Hello {user.emailAddresses[0].emailAddress}</Text>
      <SignOutButton />
    </>
}