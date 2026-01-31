import { useAuth, useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";
import { SignOutButton } from '@/components/sign-out-button'
import { useEffect, useState } from "react";

export function MainPage() {
    const { user } = useUser();
    const { getToken } = useAuth();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const f = async () => {
            const token = await getToken();
            const response = await fetch('http://192.168.1.91:3000/api/auth-test', {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });

            console.log("Response status:", response.status);

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