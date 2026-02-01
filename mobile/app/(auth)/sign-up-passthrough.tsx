import { BackendGateway } from "@/api/backend-gateway";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";

// SignUpPassthrough is a boilerplate component used to handle post sign-up logic
export default function SignUpPassthrough() {
    const { user } = useUser();
    const { getToken } = useAuth();
    const [isDone, setIsDone] = useState<boolean>(false);

    if (!user) {
        throw new Error("User is not signed in - this should be unreachable");
    }

    useEffect(() => {
        const f = async () => {
            const res = await BackendGateway.userLoggedIn(getToken, user.id, user.emailAddresses[0].emailAddress);
            
            console.log("Backend notified of user login, response:", res.status);
            if (!res.ok) {
                throw new Error("Failed to notify backend of user login" + res.statusText);
            }
            setIsDone(true);
        };

        f();
    }, []);

    if (!isDone) {
        return <Text>Loading...</Text>;
    }

    return <Redirect href="/" />;
}