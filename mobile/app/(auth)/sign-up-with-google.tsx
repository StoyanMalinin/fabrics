import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button, View } from 'react-native';
import { useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

// Warm up the browser for faster loading on Android
WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignUp() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const onPress = React.useCallback(async () => {
    try {
      // Start the OAuth flow
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        // Navigate to passthrough after session is set
        router.push('/(auth)/sign-up-passthrough');
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [startSSOFlow, router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sign up with Google" onPress={onPress} />
    </View>
  );
}