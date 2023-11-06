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

const PurchaseOrder = ({ purchaseOrder }) => (
  <Document>
    <Page size="A4" style={styles.body}>
      <View>
        <Image
          style={styles.imageLogo}
          src="/img/exepart-gradient.png"
          alt="exepart-gradient.png"
        />
        <Text style={styles.title}>PURCHASE ORDER</Text>
      </View>
      <View style={styles.sectionItemDetail}>
        <View style={styles.leftColumn}>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Vendor</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Company Name</Text>
            <Text style={styles.subItem}>: {purchaseOrder.vendor.name}</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Address</Text>
            <Text style={styles.subItem}>: {purchaseOrder.vendor.address}</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Contact Name</Text>
            <Text style={styles.subItem}>
              : {purchaseOrder.vendor.contact_name}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Phone Number</Text>
            <Text style={styles.subItem}>: {purchaseOrder.vendor.phone}</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>E-mail</Text>
            <Text style={styles.subItem}>: {purchaseOrder.vendor.email}</Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Order Number</Text>
            <Text style={styles.subItem}>
              : {purchaseOrder.purchase_order_info.number}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Order Date</Text>
            <Text style={styles.subItem}>
              :{' '}
              {moment(purchaseOrder.purchase_order_info.date).format(
                'dddd, D MMMM YYYY'
              )}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.sectionItemDetail}>
        <View style={styles.leftColumn}>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Bill To</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subItem}>{purchaseOrder.bill_to.name}</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Address</Text>
            <Text style={styles.subItem}>
              : {purchaseOrder.bill_to.address}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Contact Name</Text>
            <Text style={styles.subItem}>
              : {purchaseOrder.bill_to.contact_name}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Phone Number</Text>
            <Text style={styles.subItem}>: {purchaseOrder.bill_to.phone}</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>E-mail</Text>
            <Text style={styles.subItem}>: {purchaseOrder.bill_to.email}</Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Ship To</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Company Name</Text>
            <Text style={styles.subItem}>: {purchaseOrder.ship_to.name}</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Address</Text>
            <Text style={styles.subItem}>
              : {purchaseOrder.ship_to.address}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Contact Name</Text>
            <Text style={styles.subItem}>
              : {purchaseOrder.ship_to.contact_name}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>Phone Number</Text>
            <Text style={styles.subItem}>: {purchaseOrder.ship_to.phone}</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subTitleNumber}>E-mail</Text>
            <Text style={styles.subItem}>: {purchaseOrder.ship_to.email}</Text>
          </View>
        </View>
      </View>
      {/* table */}
      <View>
        <View style={styles.tableHead}>
          <Text style={styles.pn}>P/N</Text>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.mfg}>Mfg</Text>
          <Text style={styles.dc}>DC</Text>
          <Text style={styles.qty}>Quantity</Text>
          <Text style={styles.unitPrice}>Unit Price (USD)</Text>
          <Text style={styles.total}>Total (USD)</Text>
        </View>
        <View style={styles.tableBody}>
          <Text style={styles.pn}>{purchaseOrder.table_data.pn}</Text>
          <Text style={styles.description}>
            {purchaseOrder.table_data.description}
          </Text>
          <Text style={styles.mfg}>{purchaseOrder.table_data.mfg}</Text>
          <Text style={styles.dc}>{purchaseOrder.table_data.datecode}</Text>
          <Text style={styles.qty}>{purchaseOrder.table_data.qty}</Text>
          <Text style={styles.unitPrice}>
            {purchaseOrder.table_data.unit_price}
          </Text>
          <Text style={styles.total}>{purchaseOrder.table_data.total}</Text>
        </View>
        <View style={{ margin: 5 }}></View>
        <View style={styles.tableSummary}>
          <Text style={styles.pn}></Text>
          <Text style={styles.description}></Text>
          <Text style={styles.mfg}></Text>
          <Text style={styles.dc}></Text>
          <Text style={styles.qty}></Text>
          <Text style={styles.grandTotal}>TOTAL (USD)</Text>
          <Text style={styles.grandTotal}>{purchaseOrder.grand_total}</Text>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={styles.noteTitle}>Terms & Conditions</Text>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>SHIPPED VIA</Text>
          <Text style={styles.noteItem}>: {purchaseOrder.shipped_via}</Text>
        </View>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>SHIPPING DATE</Text>
          <Text style={styles.noteItem}>: {purchaseOrder.shipping_date}</Text>
        </View>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={styles.noteTitle}>PURCHASING CONDITIONS:</Text>
        <Text style={styles.noteItem}>
          1. By signing this Purchase Order, Seller approves to reimburse the
          full amount due to the warranty of 90 days. The warranty period starts
          with the receipt of shipment by the Purchaser. Exepart only accepts
          %100 original and new products. Any item that is not new or original
          will be returned and full refund will be done by the Seller.
        </Text>
        <Text style={styles.noteItem}>
          2. In cases where testing is applied, full reimbursement (excluding
          the testing costs) is considered as adopted by the Seller, if test
          results are not accepted by the customer for any reason.
        </Text>
        <Text style={styles.noteItem}>
          3. Via this PO, it is accepted by the Seller to make the refunding
          within 3 business days after receiving their products at their
          premises.
        </Text>
        <Text style={styles.noteItem}>
          4. Seller agrees to follow the shipping date strictly and Exepart
          reserves the rights to cancel the order and request the refunding of
          full amount in case of delays.
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
  subTitleNumber: {
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
    fontFamily: 'Open Sans',
    backgroundColor: '#00C8FA',
    padding: 2,
    marginBottom: 1,
  },
  pn: {
    width: '20%',
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
    width: '10%',
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
export default PurchaseOrder
