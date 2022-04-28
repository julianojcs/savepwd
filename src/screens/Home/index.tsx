import { useCallback, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

import { Card } from '../../components/Card'
import { HeaderHome } from '../../components/HeaderHome'
import { useFocusEffect } from '@react-navigation/native'

import { styles } from './styles'
import { Button } from '../../components/Button'
import { CardProps } from '../../@types/navigation'
import Toast from 'react-native-toast-message'

export function Home() {
  const [data, setData] = useState<CardProps[]>([])

  const { getItem, setItem, removeItem } = useAsyncStorage('@savepwd:passwords')

  async function handleFetchData() {
    const response = await getItem()
    const data = response ? JSON.parse(response) : []
    setData(data)
  }

  async function handleRemove(id?: string) {
    if (!id) {
      removeItem()
      setData([])
      Toast.show({
        type: 'success',
        text1: 'Data successfully deleted!',
        text2: `Now your repositore is empty.`,
        position: 'top'
      })
    } else {
      const response = await getItem()
      const previousData = response ? JSON.parse(response) : []
      const data = previousData.filter((item: CardProps) => item.id !== id)
      setItem(JSON.stringify(data))
      setData(data)
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchData()
    }, [])
  )

  return (
    <View style={styles.container}>
      <HeaderHome />

      <View style={styles.listHeader}>
        <Text style={styles.title}>Your Passwords</Text>

        <Text style={styles.listCount}>{`${data.length} in total`}</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card data={item} onPress={() => handleRemove(item.id)} />
        )}
      />

      <View style={styles.footer}>
        <Button title='Delete all data' onPress={() => handleRemove()} />
      </View>
    </View>
  )
}
