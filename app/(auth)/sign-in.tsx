import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

// --- CalMind Style Guide Components (Adopted from SignUpScreen) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F5F7FA', // Calming Background
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    height: 50,
    backgroundColor: '#4A90E2', // Primary Blue
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
  },
  linkText: {
    color: '#4A90E2', // Primary Blue for links
    fontWeight: '600',
    fontSize: 16,
  },
  errorText: {
    color: '#D0021B',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
  baseText: {
    color: '#777777',
    fontSize: 16,
  }
})

// --- Sign In Component ---
export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded || isLoading) return

    setError(null)
    setIsLoading(true)

    try {
      const signInAttempt = await signIn!.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // Handle incomplete status if further steps (like MFA) are required
        console.error("Sign-in incomplete status:", JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      // Catch network errors, invalid credentials, form errors (status 422)
      const errorMessage = err.errors?.[0]?.longMessage || 'Invalid email or password. Please try again.'
      setError(errorMessage)
      console.error("Sign-in error:", JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back to CalMind</Text>
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity 
        onPress={onSignInPress} 
        style={styles.button}
        disabled={isLoading || !emailAddress || !password}
      >
        {isLoading ? (
            <ActivityIndicator color="white" />
        ) : (
            <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>

      <View style={styles.linkRow}>
        <Text style={styles.baseText}>Need an account?</Text>
        <Link href="/sign-up">
          <Text style={styles.linkText}>Sign up</Text>
        </Link>
      </View>

      <View style={styles.linkRow}>
        {/* Placeholder for Forgot Password */}
        <Link href="/reset-password">
          <Text style={styles.linkText}>Forgot Password?</Text>
        </Link>
      </View>
    </View>
  )
}