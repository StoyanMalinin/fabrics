import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { View } from 'react-native'
import GoogleSignUp from './(auth)/sign-up-with-google'
import MainPage from './main-page'

export default function Page() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 30 }}>
      <SignedIn>
        <MainPage />
      </SignedIn>

      <SignedOut>
        <GoogleSignUp />
      </SignedOut>
    </View>
  )
}