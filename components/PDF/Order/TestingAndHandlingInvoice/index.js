import React from 'react'
import moment from 'moment'
import {
  Page,
  View,
  Text,
  Font,
  Document,
  Image,
  StyleSheet,
} from '@react-pdf/renderer'

const Invoice = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.body}>
      <View>
        <Image
          style={styles.imageLogo}
          src="/img/exepart-gradient.png"
          alt="exepart-gradient.png"
        />
        <Text style={styles.title}>{data.title}</Text>
      </View>
      <View style={styles.sectionItemDetail}>
        <View style={styles.rightColumn}>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>Invoice Date</Text>
            <Text style={styles.subItem}>
              :{' '}
              {moment(data.testing_and_handling_info.date).format(
                'dddd, D MMMM YYYY'
              )}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>Invoice Number</Text>
            <Text style={styles.subItem}>
              : {data.testing_and_handling_info.number}
            </Text>
          </View>
        </View>
      </View>
      {/* table */}
      <View>
        <View style={styles.tableHead}>
          <Text style={styles.titleCol}>title</Text>
          <Text style={styles.total}>Total (USD)</Text>
        </View>
        <View style={styles.tableBody}>
          <Text style={styles.titleCol}>{data.testing.title}</Text>
          <Text style={styles.total}>{data.testing.amount}</Text>
        </View>
        <View style={{ margin: 5 }}></View>
      </View>
      {data.handling_service_aviability && (
        <View>
          <View style={styles.tableHead}>
            <Text style={styles.titleCol}>title</Text>
            <Text style={styles.total}>Total (USD)</Text>
          </View>
          <View style={styles.tableBody}>
            <Text style={styles.titleCol}>{data.handling.title}</Text>
            <Text style={styles.total}>{data.handling.amount}</Text>
          </View>
          <View style={{ margin: 5 }}></View>
        </View>
      )}
      <View style={styles.tableSummary}>
        <Text style={styles.titleCol}></Text>
        <Text style={styles.grandTotal}>TOTAL (USD)</Text>
        <Text style={styles.grandTotal}>
          {data.handling_service_aviability
            ? parseInt(data.handling.amount) + parseInt(data.testing.amount)
            : data.testing.amount}
        </Text>
      </View>
      <Text style={styles.pageNumber} fixed>
        Copyright {new Date().getFullYear()} EXEpart Electronics Inc.
      </Text>
    </Page>
  </Document>
)

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
})

Font.register({
  family: 'Open Sans',
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
})

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  imageLogo: {
    width: 200,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Oswald',
    marginBottom: 10,
  },

  inlineItem: {
    flexDirection: 'row',
  },
  sectionSubTitle: {
    width: '30%',
    fontSize: 9,
    fontFamily: 'Oswald',
  },
  subTitleBuyer: {
    width: '30%',
    fontSize: 9,
    fontFamily: 'Oswald',
  },
  subItem: {
    fontSize: 9,
    fontFamily: 'Open Sans',
    width: '30%',
  },
  sectionItemDetail: {
    flexDirection: 'row',
    marginBottom: 9,
    justifyContent: 'space-between',
  },
  leftColumn: {
    flexDirection: 'column',
  },
  rightColumn: {
    flexDirection: 'column',
  },

  tableHead: {
    flexDirection: 'row',
    fontSize: 8,
    fontFamily: 'Oswald',
    backgroundColor: '#b1b1b1',
    padding: 2,
    marginBottom: 1,
  },
  tableBody: {
    flexDirection: 'row',
    fontSize: 8,
    fontFamily: 'Open Sans',
    backgroundColor: '#ececec',
    padding: 2,
    marginBottom: 1,
  },
  tableSummary: {
    flexDirection: 'row',
    fontSize: 8,
    backgroundColor: '#00C8FA',
    padding: 2,
    marginBottom: 1,
  },
  titleCol: {
    width: '80%',
    fontSize: 7,
    padding: 2,
  },
  description: {
    width: '30%',
    fontSize: 7,
    padding: 2,
    flexDirection: 'column',
  },
  mfg: {
    width: '20%',
    fontSize: 7,
    padding: 2,
    flexDirection: 'column',
  },
  dc: {
    width: '10%',
    fontSize: 7,
    padding: 2,
    flexDirection: 'column',
  },
  qty: {
    width: '10%',
    textAlign: 'right',
    fontSize: 7,
    padding: 2,
    flexDirection: 'column',
  },
  unitPrice: {
    width: '10%',
    textAlign: 'right',
    fontSize: 7,
    padding: 2,
    flexDirection: 'column',
  },
  total: {
    width: '20%',
    textAlign: 'right',
    fontSize: 7,
    padding: 2,
    flexDirection: 'column',
  },
  grandTotal: {
    fontFamily: 'Oswald',
    width: '20%',
    textAlign: 'right',
    fontSize: 10,
    padding: 2,
    flexDirection: 'column',
  },
  noteTitle: {
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: 'Oswald',
  },
  noteItem: {
    fontSize: 8,
    fontFamily: 'Open Sans',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'Oswald',
  },
})

export default Invoice
