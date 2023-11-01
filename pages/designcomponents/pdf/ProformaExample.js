import React from 'react'
import {
  Page,
  Text,
  Font,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer'

const Quixote = (props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1 123</Text>
          <Text>Section #1 123</Text>
        </View>
      </Page>
    </Document>
  )
}

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
})

const styles = StyleSheet.create({
  page: { backgroundColor: 'tomato' },
  section: { color: 'white', textAlign: 'center', margin: 30 },
})

export default Quixote
