import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import Toast from 'react-native-toast-message'
import uuid from 'react-native-uuid'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

import { styles } from './styles'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { HeaderForm } from '../../components/HeaderForm'
import { CardProps } from '../../@types/navigation'

import { cryptoKey } from '../../config'
var CryptoJS = require('crypto-js')

export function Form() {
  const [name, setName] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const { getItem, setItem } = useAsyncStorage('@savepwd:passwords')

  async function handleSave() {
    let decryptedData: CardProps[]
    try {
      if (name === '') {
        throw new Error('Service name is required!')
      }
      const id = uuid.v4().toString()
      const newData: CardProps = {
        id,
        name,
        user,
        password
      }
      const response = await getItem()
      if (response) {
        const bytes = CryptoJS.AES.decrypt(response, cryptoKey)
        decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      } else {
        decryptedData = []
      }

      const exists: CardProps | undefined = decryptedData.find(
        (data: CardProps) =>
          data.name.toUpperCase() === newData.name.toUpperCase()
      )
      if (!!exists) {
        throw new Error('Service name already exists')
      }
      if (newData.user === '') {
        throw new Error('E-mail or Username is required!')
      }
      const data = [...decryptedData, newData]
      await setItem(
        // Encrypt
        CryptoJS.AES.encrypt(
          JSON.stringify(data),
          'process.env.REACT_APP_CRYPTO_KEY'
        ).toString()
      )
      Toast.show({
        type: 'success',
        text1: 'Successfully registered!',
        text2: `${newData.name} saved.`,
        position: 'top'
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message)
        Toast.show({
          type: 'error',
          text1: 'Registration Error.',
          text2: `${error.message}.`,
          position: 'top'
        })
      }
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView>
          <HeaderForm />

          <View style={styles.form}>
            <Input label='Service name' onChangeText={setName} />
            <Input
              label='E-mail or Username'
              autoCapitalize='none'
              onChangeText={setUser}
            />
            <Input
              label='Password'
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.footer}>
            <Button title='Save' onPress={handleSave} />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}
