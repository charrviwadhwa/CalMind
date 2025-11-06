import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

// --- CalMind Style Guide Components ---
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
  linkText: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  errorText: {
    color: '#D0021B',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
  },
})

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [fullName, setFullName] = React.useState('') // Added for B2B MVP
  const [hasConsent, setHasConsent] = React.useState(false) // Added for DPDPA
  const [isCorporate, setIsCorporate] = React.useState(false) // Added for B2B
  
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  
  // --- Sign Up Submission ---
  const onSignUpPress = async () => {
    if (!isLoaded || !hasConsent) return

    setError(null)
    setIsLoading(true)

    try {
      await signUp.create({
        emailAddress,
        password,
        // --- Store initial data for CalMind backend ---
        unsafeMetadata: {
          fullName: fullName,
          user_type: isCorporate ? 'employee' : 'individual',
          has_anonymization_consent: hasConsent,
        }
      })

      // Send verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)

    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.longMessage || 'An unknown error occurred during sign up.'
      setError(errorMessage)
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  // --- Verification Submission ---
  const onVerifyPress = async () => {
    if (!isLoaded) return
    setError(null)
    setIsLoading(true)

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/') // Redirect to the main dashboard
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
        setError("Verification failed. Please check your code.")
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || 'Invalid code. Please try again.')
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  // --- Verification Form (Second Step) ---
  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify Your Email</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={onVerifyPress} style={styles.button} disabled={isLoading}>
          <Text style={styles.buttonText}>{isLoading ? 'Verifying...' : 'Verify'}</Text>
        </TouchableOpacity>
        <Link href="/sign-in" style={{ marginTop: 20, textAlign: 'center' }}>
          <Text style={styles.linkText}>Back to Sign In</Text>
        </Link>
      </View>
    )
  }

  // --- Sign Up Form (First Step) ---
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CalMind</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TextInput
        style={styles.input}
        value={fullName}
        placeholder="Full Name"
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      
      {/* --- DPDPA Consent Checkbox --- */}
      <TouchableOpacity 
        onPress={() => setHasConsent(!hasConsent)} 
        style={styles.consentRow}
      >
        <Text style={{ marginRight: 10, fontSize: 20 }}>
          {hasConsent ? '✅' : '☐'}
        </Text>
        <Text style={{ flex: 1, fontSize: 14 }}>
          I consent to the Terms and Anonymized Data Use (DPDPA).
        </Text>
      </TouchableOpacity>
      
      {/* --- B2B Role Toggle --- */}
      <TouchableOpacity 
        onPress={() => setIsCorporate(!isCorporate)} 
        style={styles.consentRow}
      >
        <Text style={{ marginRight: 10, fontSize: 20 }}>
          {isCorporate ? '✅' : '☐'}
        </Text>
        <Text style={{ flex: 1, fontSize: 14 }}>
          Sign up as a Corporate Employee
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={onSignUpPress} 
        style={styles.button} 
        disabled={!hasConsent || isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Creating Account...' : 'Continue'}
        </Text>
      </TouchableOpacity>
      
      <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', gap: 5 }}>
        <Text style={{ color: styles.input.borderColor }}>Already have an account?</Text>
        <Link href="/sign-in">
          <Text style={styles.linkText}>Sign in</Text>
        </Link>
      </View>
    </View>
  )
}