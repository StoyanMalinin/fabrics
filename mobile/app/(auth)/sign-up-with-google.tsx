import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button, View } from 'react-native';
import { useSSO } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

// Warm up the browser for faster loading on Android
WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignUp() {
  const { startSSOFlow } = useSSO();

  const onPress = React.useCallback(async () => {
    try {
      // Start the OAuth flow
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
        // This should match your app.json scheme
        redirectUrl: Linking.createURL('/dashboard', { scheme: 'your-app-scheme' }),
      });

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [startSSOFlow]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sign up with Google" onPress={onPress} />
    </View>
  );
}