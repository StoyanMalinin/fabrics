import { useAuth, useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";
import { SignOutButton } from '@/components/sign-out-button'
import { useEffect, useState } from "react"
import { BackendGateway } from "@/api/backend-gateway";

export default function MainPage() {
    const { user } = useUser();
    const { getToken } = useAuth();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const f = async () => {
            const response = await BackendGateway.authTest(getToken);

            const data = await response.json();
            setUserId(data.userId);
        }

        f();
    }, []);
    
    if (!user) {
        throw new Error("User is not signed in - this should be unreachable");
    }

    if (userId === null) {
        return <Text>Loading...</Text>
    }

    return <>
        <Text>Hello {user.emailAddresses[0].emailAddress}</Text>
        <Text>Your user ID is: {userId}</Text>
        <SignOutButton />
    </>
}