import { useCallback, useState } from 'react'
import { FlatList, Text, View } from 'react-native'

import { Card, CardProps } from '../../components/Card'
import { HeaderHome } from '../../components/HeaderHome'
import { useFocusEffect } from '@react-navigation/native'

import { styles } from './styles'
import { Button } from '../../components/Button'

export function Home() {
  const [data, setData] = useState<CardProps[]>([])

  const handleRemove = (id: string): void => {
    throw new Error('Function not implemented.')
  }

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
        <Button title='Clear' />
      </View>
    </View>
  )
}